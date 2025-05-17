import "dotenv/config"
import express, { Application } from "express"
import swaggerUi from "swagger-ui-express"
import { RegisterRoutes } from "@/shared/infrastructure/routes/routes"
import swaggerJson from "@/shared/infrastructure/spec/swagger.json"
import { logger } from "@/shared/infrastructure/logger/logger"
import { errorHandlerMiddleware } from "@/shared/infrastructure/middleware/error-handler"

export function createApp() {
  const app = express()
  app.use(express.json())
  RegisterRoutes(app)
  app.use(errorHandlerMiddleware)
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJson))
  return app
}

function startServer(app: Application) {
  const host = process.env.HOST || "localhost"
  const port = process.env.PORT || 3000

  app.listen(port, () => {
    logger.warn(`Running on ${process.env.NODE_ENV} mode`)
    logger.info(`Server listening on http://${host}:${port}`)
  })
}

const app = createApp()
startServer(app)
