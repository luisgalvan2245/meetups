import "reflect-metadata"
import fastify, { FastifyRequest } from "fastify"
import swagger from "@fastify/swagger"
// @ts-ignore
import swaggerUi from "@fastify/swagger-ui"
import { bootstrap } from "fastify-decorators"
import { resolve } from "path"

const server = fastify({
  logger: true
})

// Parse JSON body
server.addContentTypeParser(
  "application/json",
  { parseAs: "string" },
  (
    _req: FastifyRequest,
    body: string,
    done: (err: Error | null, parsed?: unknown) => void
  ) => {
    try {
      const json = JSON.parse(body)
      done(null, json)
    } catch (err) {
      done(err as Error, undefined)
    }
  }
)

// Swagger documentation
async function setupSwagger() {
  await server.register(swagger, {
    swagger: {
      info: {
        title: "Meetup API",
        description: "API documentation for the Meetup application",
        version: "1.0.0"
      },
      host: "localhost:3000",
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
      tags: [
        {
          name: "meetups",
          description: "Meetup related endpoints"
        }
      ],
      definitions: {
        MeetupModel: {
          type: "object",
          required: [
            "id",
            "title",
            "description",
            "date",
            "location",
            "imageUrl",
            "createdAt",
            "updatedAt"
          ],
          properties: {
            id: { type: "string" },
            title: { type: "string" },
            description: { type: "string" },
            date: { type: "string", format: "date-time" },
            location: { type: "string" },
            imageUrl: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" }
          }
        }
      }
    }
  })

  await server.register(swaggerUi, {
    routePrefix: "/docs"
  })
}

// Start server
async function start() {
  try {
    // Set up Swagger
    await setupSwagger()

    // Register controllers using fastify-decorators
    await server.register(bootstrap, {
      directory: resolve(__dirname, "meetup/infrastructure/controllers"),
      mask: /\.controller\.[jt]s$/
    })

    // Start server
    await server.listen({
      port: Number(process.env.PORT) || 3000,
      host: "0.0.0.0"
    })
    console.log(
      `Server running at http://localhost:${process.env.PORT || 3000}`
    )
    console.log(
      `Swagger documentation at http://localhost:${
        process.env.PORT || 3000
      }/docs`
    )
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()
