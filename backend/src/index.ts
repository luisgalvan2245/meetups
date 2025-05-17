import express from "express"
import swaggerUi from "swagger-ui-express"
import { RegisterRoutes } from "./shared/infrastructure/routes/routes"
import swaggerJson from "./shared/infrastructure/spec/swagger.json"

const app = express()
app.use(express.json())

// Swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJson))

// Rutas
RegisterRoutes(app)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
  console.log(`Swagger at http://localhost:${port}/docs`)
})
