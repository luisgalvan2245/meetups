import { FastifyInstance } from "fastify"
import { EntityId } from "@/shared/domain/value-objects/EntityId"
import { MeetupService } from "@/meetup/application/services/MeetupService"
import { MockMeetupRepository } from "@/meetup/infrastructure/repositories/MockMeetupRepository"
import {
  CreateMeetupDto,
  UpdateMeetupDto,
  IdParams
} from "@/meetup/infrastructure/schemas/meetup.schemas"

// Controlador usando registro de rutas manual con schemas de Zod
export default class MeetupController {
  private meetupService: MeetupService

  constructor() {
    this.meetupService = new MeetupService(new MockMeetupRepository())
  }

  // Método para registrar todas las rutas
  public registerRoutes(server: FastifyInstance): void {
    console.log("Registering meetup routes")

    // GET /meetups
    server.get(
      "/meetups",
      {
        schema: {
          tags: ["meetups"],
          response: {
            200: {
              description: "Listado de todos los meetups",
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
      },
      async () => {
        const meetups = await this.meetupService.getAllMeetups()
        return meetups.map(meetup => meetup.toPrimitives())
      }
    )

    // GET /meetups/:id
    server.get<{ Params: IdParams }>(
      "/meetups/:id",
      {
        schema: {
          tags: ["meetups"],
          params: {
            type: "object",
            properties: {
              id: { type: "string" }
            }
          },
          response: {
            200: {
              description: "Detalles de un meetup",
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
            },
            404: {
              description: "Meetup no encontrado",
              type: "null"
            }
          }
        }
      },
      async request => {
        const meetup = await this.meetupService.getMeetupById(
          EntityId.create(request.params.id)
        )
        return meetup ? meetup.toPrimitives() : null
      }
    )

    // POST /meetups
    server.post<{ Body: CreateMeetupDto }>(
      "/meetups",
      {
        schema: {
          tags: ["meetups"],
          body: {
            type: "object",
            required: ["title", "description", "date", "location", "imageUrl"],
            properties: {
              title: { type: "string", minLength: 3, maxLength: 100 },
              description: { type: "string", minLength: 10, maxLength: 2000 },
              date: { type: "string", format: "date-time" },
              location: { type: "string", minLength: 3, maxLength: 200 },
              imageUrl: { type: "string", format: "uri" }
            }
          },
          response: {
            201: {
              description: "Meetup creado",
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
      async request => {
        const meetup = await this.meetupService.createMeetup({
          ...request.body,
          date: new Date(request.body.date)
        })
        return meetup.toPrimitives()
      }
    )

    // PUT /meetups/:id
    server.put<{ Params: IdParams; Body: UpdateMeetupDto }>(
      "/meetups/:id",
      {
        schema: {
          tags: ["meetups"],
          params: {
            type: "object",
            properties: {
              id: { type: "string" }
            }
          },
          body: {
            type: "object",
            properties: {
              title: { type: "string", minLength: 3, maxLength: 100 },
              description: { type: "string", minLength: 10, maxLength: 2000 },
              date: { type: "string", format: "date-time" },
              location: { type: "string", minLength: 3, maxLength: 200 },
              imageUrl: { type: "string", format: "uri" }
            }
          },
          response: {
            200: {
              description: "Meetup actualizado",
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
            },
            404: {
              description: "Meetup no encontrado",
              type: "null"
            }
          }
        }
      },
      async request => {
        const updateData = {
          ...request.body,
          date: request.body.date ? new Date(request.body.date) : undefined
        }

        const meetup = await this.meetupService.updateMeetup(
          EntityId.create(request.params.id),
          updateData
        )
        return meetup ? meetup.toPrimitives() : null
      }
    )

    // DELETE /meetups/:id
    server.delete<{ Params: IdParams }>(
      "/meetups/:id",
      {
        schema: {
          tags: ["meetups"],
          params: {
            type: "object",
            properties: {
              id: { type: "string" }
            }
          },
          response: {
            204: {
              description: "Meetup eliminado",
              type: "null"
            },
            404: {
              description: "Meetup no encontrado",
              type: "null"
            }
          }
        }
      },
      async request => {
        await this.meetupService.deleteMeetup(
          EntityId.create(request.params.id)
        )
      }
    )
  }
}
