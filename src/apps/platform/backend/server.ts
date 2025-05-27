import 'dotenv/config'
import express, { Express } from 'express'
import { Server as HttpServer } from 'http'
import swaggerUi from 'swagger-ui-express'
import { promisify } from 'util'

import Logger from '../../../contexts/platform/Shared/domain/logger/Logger'
import { container } from '../../../contexts/platform/Shared/infrastructure/dependencies/container'
import { ErrorHandlerMiddleware } from '../../../contexts/platform/Shared/infrastructure/middlewares/ErrorHandlerMiddleware'
import { RegisterRoutes } from './routes/routes'
import swaggerJson from './spec/swagger.json'

interface ServerOptions {
  port?: number
  silent?: boolean
  logger?: Logger
}

type ListenAsync = (port: number) => Promise<HttpServer>

export class Server {
  readonly app: Express

  private readonly logger: Logger
  private readonly port: number
  private readonly silent: boolean
  private httpServer?: HttpServer

  constructor({
    port = Number(process.env.PORT) || 3000,
    silent = false,
    logger = container.logger
  }: ServerOptions = {}) {
    this.port = port
    this.silent = silent
    this.logger = logger
    this.app = express()

    this.setupBodyParsing()
    this.setupRoutes()
    this.setupSwagger()
    this.setupErrorHandling()
  }

  async listen(): Promise<void> {
    const listenAsync: ListenAsync = promisify(this.app.listen.bind(this.app))
    this.httpServer = await listenAsync(this.port)

    if (!this.silent) {
      this.logger.info(`Running on ${process.env.NODE_ENV} environment`)
      this.logger.info(`Server is running on port ${this.port}`)
    }
  }

  async close(): Promise<void> {
    if (!this.httpServer) return

    const closeAsync = promisify(this.httpServer.close.bind(this.httpServer))
    await closeAsync()
  }

  private setupBodyParsing(): void {
    this.app.use(express.json())
  }

  private setupRoutes(): void {
    RegisterRoutes(this.app)
  }

  private setupSwagger(): void {
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJson))
  }

  private setupErrorHandling(): void {
    this.app.use(ErrorHandlerMiddleware.handle)
  }
}
