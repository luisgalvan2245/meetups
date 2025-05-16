import express from "express"
import swaggerUi from "swagger-ui-express"
import { RegisterRoutes } from "./routes/routes"
import * as swaggerJson from "../public/swagger.json"

const app = express()
const port = process.env.PORT || 3000

// Middleware para parsear JSON
app.use(express.json())

// Servir la documentación Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJson))

// Registrar las rutas generadas por tsoa
RegisterRoutes(app)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
  console.log(`Swagger documentation at http://localhost:${port}/api-docs`)
})
