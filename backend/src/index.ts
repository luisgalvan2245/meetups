import express from "express"
import eventRoutes from "./events/routes/eventRoutes"

const app = express()
const port = process.env.PORT || 3000

// Middleware para parsear JSON
app.use(express.json())

// Rutas
app.use("/api/events", eventRoutes)

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ message: "Hello from Express!" })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
