import "reflect-metadata"
import {
  createServer,
  startServer
} from "@/shared/infrastructure/server/server-config"
import { setupSwagger } from "@/shared/infrastructure/swagger/swagger-config"
import MeetupController from "@/meetup/infrastructure/controllers/MeetupController"

async function main() {
  try {
    const server = createServer()

    // 1. Registra el controlador de meetups manualmente
    const meetupController = new MeetupController()
    meetupController.registerRoutes(server)

    // 2. Configurar Swagger (después de registrar las rutas)
    await setupSwagger(server)

    // 3. Inicia el servidor
    await startServer(server)
  } catch (error) {
    console.error("Error starting server:", error)
    process.exit(1)
  }
}

main()
