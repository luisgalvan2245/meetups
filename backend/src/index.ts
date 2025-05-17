import "dotenv/config"
import express from "express"
import swaggerUi from "swagger-ui-express"
import { RegisterRoutes } from "@/shared/infrastructure/routes/routes"
import swaggerJson from "@/shared/infrastructure/spec/swagger.json"
import type { Request, Response, NextFunction } from "express"

const app = express()

// JSON parser Middleware
app.use(express.json())

// Error handling Middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  switch (err?.status) {
    case 400:
      return res.status(400).json({ message: "Bad Request" })
    case 500:
      return res.status(500).json({ message: "Internal server error" })
  }
  return err
})

// Routes
RegisterRoutes(app)

// Swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJson))

// Server
function startServer() {
  const host = process.env.HOST || "localhost"
  const port = process.env.PORT || 3000
  const url = `http://${host}:${port}`

  app.listen(port, () => {
    console.log(`Environment: ${process.env.NODE_ENV}`)
    console.log(`Server: ${url}`)
    console.log(`Swagger: ${url}/docs`)
  })
}

startServer()
