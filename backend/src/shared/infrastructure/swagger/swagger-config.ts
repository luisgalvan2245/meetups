import { FastifyInstance } from "fastify"
import swagger from "@fastify/swagger"
import swaggerUi from "@fastify/swagger-ui"
import { API_SCHEMAS } from "../schemas/api-schemas"

// Configuración de Swagger centralizada
export async function setupSwagger(server: FastifyInstance): Promise<void> {
  // Registrar Swagger con rutas explícitas
  await server.register(swagger, {
    openapi: {
      info: {
        title: "Meetup API",
        description: "API documentation for the Meetup application",
        version: "1.0.0"
      },
      servers: [
        {
          url: "http://localhost:3000",
          description: "Local development server"
        }
      ],
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
                description: "List of all meetups",
                content: {
                  "application/json": {
                    schema: {
                      type: "array",
                      items: {
                        type: "object",
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
                }
              }
            }
          },
          post: {
            tags: ["meetups"],
            summary: "Create a new meetup",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: [
                      "title",
                      "description",
                      "date",
                      "location",
                      "imageUrl"
                    ],
                    properties: {
                      title: { type: "string", minLength: 3, maxLength: 100 },
                      description: {
                        type: "string",
                        minLength: 10,
                        maxLength: 2000
                      },
                      date: { type: "string", format: "date-time" },
                      location: {
                        type: "string",
                        minLength: 3,
                        maxLength: 200
                      },
                      imageUrl: { type: "string", format: "uri" }
                    }
                  }
                }
              }
            },
            responses: {
              "201": {
                description: "Created meetup",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
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
                schema: { type: "string" },
                required: true,
                description: "ID of the meetup"
              }
            ],
            responses: {
              "200": {
                description: "Meetup details",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
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
                schema: { type: "string" },
                required: true,
                description: "ID of the meetup"
              }
            ],
            requestBody: {
              description: "Meetup object to update",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      title: { type: "string", minLength: 3, maxLength: 100 },
                      description: {
                        type: "string",
                        minLength: 10,
                        maxLength: 2000
                      },
                      date: { type: "string", format: "date-time" },
                      location: {
                        type: "string",
                        minLength: 3,
                        maxLength: 200
                      },
                      imageUrl: { type: "string", format: "uri" }
                    }
                  }
                }
              }
            },
            responses: {
              "200": {
                description: "Updated meetup",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
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
                schema: { type: "string" },
                required: true,
                description: "ID of the meetup"
              }
            ],
            responses: {
              "204": {
                description: "Meetup deleted"
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

  // Registrar UI de Swagger
  await server.register(swaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "list",
      deepLinking: false
    },
    staticCSP: true,
    transformSpecification: transformSpec
  })
}

// Función de transformación para arreglar posibles problemas en la especificación
function transformSpec(swaggerObject: any) {
  return swaggerObject
}
