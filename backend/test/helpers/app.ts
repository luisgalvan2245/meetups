import express from "express"
import swaggerUi from "swagger-ui-express"
import { RegisterRoutes } from "../../src/shared/infrastructure/routes/routes"
import swaggerJson from "../../src/shared/infrastructure/spec/swagger.json"

export function createTestApp() {
  const app = express()
  app.use(express.json())
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJson))
  RegisterRoutes(app)
  return app
}
