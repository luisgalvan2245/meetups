import { FastifyInstance } from "fastify"
import { EntityId } from "@/shared/domain/value-objects/EntityId"
import { MeetupService } from "@/meetup/application/services/MeetupService"
import { MockMeetupRepository } from "@/meetup/infrastructure/repositories/MockMeetupRepository"
import {
  MeetupModel,
  CreateMeetupBody,
  UpdateMeetupBody,
  IdParams,
  RouteSchemas
} from "@/meetup/infrastructure/types/MeetupTypes"

// Controlador usando registro de rutas manual (sin decoradores)
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
        schema: RouteSchemas.getAllMeetups
      },
      async (): Promise<MeetupModel[]> => {
        const meetups = await this.meetupService.getAllMeetups()
        return meetups.map(meetup => meetup.toPrimitives())
      }
    )

    // GET /meetups/:id
    server.get<{ Params: IdParams }>(
      "/meetups/:id",
      {
        schema: RouteSchemas.getMeetupById
      },
      async (request): Promise<MeetupModel | null> => {
        const meetup = await this.meetupService.getMeetupById(
          EntityId.create(request.params.id)
        )
        return meetup ? meetup.toPrimitives() : null
      }
    )

    // POST /meetups
    server.post<{ Body: CreateMeetupBody }>(
      "/meetups",
      {
        schema: RouteSchemas.createMeetup
      },
      async (request): Promise<MeetupModel> => {
        const meetup = await this.meetupService.createMeetup({
          ...request.body,
          date: new Date(request.body.date)
        })
        return meetup.toPrimitives()
      }
    )

    // PUT /meetups/:id
    server.put<{ Params: IdParams; Body: UpdateMeetupBody }>(
      "/meetups/:id",
      {
        schema: RouteSchemas.updateMeetup
      },
      async (request): Promise<MeetupModel | null> => {
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
        schema: RouteSchemas.deleteMeetup
      },
      async (request): Promise<void> => {
        await this.meetupService.deleteMeetup(
          EntityId.create(request.params.id)
        )
      }
    )
  }
}
