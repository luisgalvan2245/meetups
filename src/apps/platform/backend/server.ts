import 'dotenv/config'
import express, { Express } from 'express'
import { Server as HttpServer } from 'http'
import 'reflect-metadata'
import swaggerUi from 'swagger-ui-express'
import { container } from 'tsyringe'

import Logger from '../../../contexts/platform/Shared/domain/logger/Logger'
import { ErrorHandlerMiddleware } from '../../../contexts/platform/Shared/infrastructure/middlewares/ErrorHandlerMiddleware'
import { RegisterRoutes } from './routes/routes'
import swaggerJson from './spec/swagger.json'

export class Server {
  readonly port: string
  private express: Express
  private logger: Logger
  private httpServer?: HttpServer

  constructor(logger: Logger = container.resolve('Logger')) {
    this.port = process.env.PORT || '3000'
    this.logger = logger
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
        this.logger.info(`Running on ${process.env.NODE_ENV} mode`)
        this.logger.info(`Server is running on port: ${this.port}`)
        resolve()
      })
    })
  }

  async close(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.httpServer?.close(error => {
        if (error) {
          return reject(error)
        }
        resolve()
      })
    })
  }
}
