import 'dotenv/config'
import express, { Express } from 'express'
import { Server as HttpServer } from 'http'
import swaggerUi from 'swagger-ui-express'
import { Logger } from 'winston'

import { WinstonLogger } from '../../../contexts/platform/Shared/infrastructure/logger/WinstonLogger'
import { ErrorHandlerMiddleware } from '../../../contexts/platform/Shared/infrastructure/middlewares/ErrorHandlerMiddleware'
import { RegisterRoutes } from './routes/routes'
import swaggerJson from './spec/swagger.json'

export class Server {
  readonly port: string
  private express: Express
  private logger: Logger
  httpServer?: HttpServer

  constructor(port: string) {
    this.port = port
    this.logger = WinstonLogger.getLogger()
    this.express = express()
    this.express.use(express.json())
    RegisterRoutes(this.express)
    this.express.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJson))
    this.express.use(ErrorHandlerMiddleware.handle)
  }

  get app(): Express {
    return this.express
  }

  async listen(): Promise<void> {
    return new Promise(resolve => {
      this.httpServer = this.express.listen(this.port, () => {
        this.logger.warn(`Running on ${process.env.NODE_ENV} mode`)
        this.logger.info(`Server is running on port: ${this.port}`)
        resolve()
      })
    })
  }
}
