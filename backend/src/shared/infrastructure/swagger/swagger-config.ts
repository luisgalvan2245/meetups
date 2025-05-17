import { FastifyInstance } from "fastify"
import swagger from "@fastify/swagger"
import swaggerUi from "@fastify/swagger-ui"
import {
  MeetupSchema,
  MeetupArraySchema,
  MeetupBodySchema,
  UpdateMeetupBodySchema,
  IdParamsSchema
} from "@/meetup/infrastructure/types/MeetupTypes"

// Configuración de Swagger
export async function setupSwagger(server: FastifyInstance): Promise<void> {
  // Registra Swagger después de que todas las rutas estén registradas
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
      paths: {
        "/meetups": {
          get: {
            tags: ["meetups"],
            summary: "Get all meetups",
            responses: {
              "200": {
                description: "Successful response",
                schema: MeetupArraySchema
              }
            }
          },
          post: {
            tags: ["meetups"],
            summary: "Create a new meetup",
            parameters: [
              {
                in: "body",
                name: "body",
                description: "Meetup object that needs to be added",
                required: true,
                schema: MeetupBodySchema
              }
            ],
            responses: {
              "201": {
                description: "Created",
                schema: MeetupSchema
              }
            }
          }
        },
        "/meetups/{id}": {
          get: {
            tags: ["meetups"],
            summary: "Get meetup by ID",
            parameters: [
              {
                in: "path",
                name: "id",
                required: true,
                type: "string",
                description: "ID of meetup to return"
              }
            ],
            responses: {
              "200": {
                description: "Successful response",
                schema: MeetupSchema
              },
              "404": {
                description: "Meetup not found"
              }
            }
          },
          put: {
            tags: ["meetups"],
            summary: "Update a meetup",
            parameters: [
              {
                in: "path",
                name: "id",
                required: true,
                type: "string",
                description: "ID of meetup to update"
              },
              {
                in: "body",
                name: "body",
                description: "Meetup object that needs to be updated",
                required: true,
                schema: UpdateMeetupBodySchema
              }
            ],
            responses: {
              "200": {
                description: "Successful response",
                schema: MeetupSchema
              },
              "404": {
                description: "Meetup not found"
              }
            }
          },
          delete: {
            tags: ["meetups"],
            summary: "Delete a meetup",
            parameters: [
              {
                in: "path",
                name: "id",
                required: true,
                type: "string",
                description: "ID of meetup to delete"
              }
            ],
            responses: {
              "204": {
                description: "No content"
              },
              "404": {
                description: "Meetup not found"
              }
            }
          }
        }
      }
    }
  })

  // Registra la UI de Swagger
  await server.register(swaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "list",
      deepLinking: false
    },
    staticCSP: true
  })
}
