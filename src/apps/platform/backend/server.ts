import 'dotenv/config'
import express, { Express } from 'express'
import { Server as HttpServer } from 'http'
import swaggerUi from 'swagger-ui-express'
import { promisify } from 'util'

import { Logger } from '../../../contexts/platform/Shared/domain/logger/Logger'
import { container } from '../../../contexts/platform/Shared/infrastructure/dependencies/container'
import { ErrorHandler } from '../../../contexts/platform/Shared/infrastructure/middlewares/ErrorHandler'
import { RegisterRoutes } from './routes/routes'
import swaggerJson from './spec/swagger.json'

interface ServerOptions {
  port?: number
  silent?: boolean
  logger?: Logger
}

type Listen = (port: number) => Promise<HttpServer>

export class Server {
  readonly app: Express

  private readonly logger: Logger
  private readonly port: number
  private readonly silent: boolean
  private server?: HttpServer

  constructor({
    port = Number(process.env.PORT) || 3000,
    silent = false,
    logger = container.logger
  }: ServerOptions = {}) {
    this.port = port
    this.silent = silent
    this.logger = logger
    this.app = express()
    this.setup()
  }

  private setup(): void {
    this.app.use(express.json())
    RegisterRoutes(this.app)
    this.app.use(ErrorHandler.handle)
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJson))
  }

  async start(): Promise<void> {
    const listen: Listen = promisify(this.app.listen.bind(this.app))
    this.server = await listen(this.port)

    if (!this.silent) {
      this.logger.info(`Server listening on port ${this.port}`)
      this.logger.info(`Running in ${process.env.NODE_ENV} mode`)
    }
  }

  async stop(): Promise<void> {
    if (!this.server) return

    const close = promisify(this.server.close.bind(this.server))
    await close()
  }
}
