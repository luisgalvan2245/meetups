import { Controller, GET, POST, PUT, DELETE } from "fastify-decorators"
import { EntityId } from "@/shared/domain/valueObjects/entityId"
import { FastifyRequest } from "fastify"
import {
  MeetupSchema,
  MeetupArraySchema,
  MeetupBodySchema,
  UpdateMeetupBodySchema,
  IdParamsSchema
} from "../schemas/meetup.schema"
import MeetupFactory from "../factories/meetupFactory"

export interface MeetupModel {
  id: string
  title: string
  description: string
  date: string
  location: string
  imageUrl: string
  createdAt: string
  updatedAt: string
}

// Interfaces para los parámetros de las solicitudes
interface CreateMeetupBody {
  title: string
  description: string
  date: string
  location: string
  imageUrl: string
}

interface UpdateMeetupBody {
  title?: string
  description?: string
  date?: string
  location?: string
  imageUrl?: string
}

interface IdParams {
  id: string
}

@Controller({ route: "/meetups" })
export default class MeetupController {
  private meetupService = MeetupFactory.getMeetupService()

  @GET({
    url: "/",
    options: {
      schema: {
        tags: ["meetups"],
        response: {
          200: MeetupArraySchema
        }
      }
    }
  })
  async getAllMeetups(): Promise<MeetupModel[]> {
    const meetups = await this.meetupService.getAllMeetups()
    return meetups.map(meetup => meetup.toPrimitives())
  }

  @GET({
    url: "/:id",
    options: {
      schema: {
        tags: ["meetups"],
        params: IdParamsSchema,
        response: {
          200: MeetupSchema
        }
      }
    }
  })
  async getMeetupById(
    request: FastifyRequest<{
      Params: IdParams
    }>
  ): Promise<MeetupModel | null> {
    const meetup = await this.meetupService.getMeetupById(
      EntityId.create(request.params.id)
    )
    return meetup ? meetup.toPrimitives() : null
  }

  @POST({
    url: "/",
    options: {
      schema: {
        tags: ["meetups"],
        body: MeetupBodySchema,
        response: {
          201: MeetupSchema
        }
      }
    }
  })
  async createMeetup(
    request: FastifyRequest<{
      Body: CreateMeetupBody
    }>
  ): Promise<MeetupModel> {
    const meetup = await this.meetupService.createMeetup({
      ...request.body,
      date: new Date(request.body.date)
    })
    return meetup.toPrimitives()
  }

  @PUT({
    url: "/:id",
    options: {
      schema: {
        tags: ["meetups"],
        params: IdParamsSchema,
        body: UpdateMeetupBodySchema,
        response: {
          200: MeetupSchema
        }
      }
    }
  })
  async updateMeetup(
    request: FastifyRequest<{
      Params: IdParams
      Body: UpdateMeetupBody
    }>
  ): Promise<MeetupModel | null> {
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

  @DELETE({
    url: "/:id",
    options: {
      schema: {
        tags: ["meetups"],
        params: IdParamsSchema,
        response: {
          204: {
            type: "null",
            description: "No content"
          }
        }
      }
    }
  })
  async deleteMeetup(
    request: FastifyRequest<{
      Params: IdParams
    }>
  ): Promise<void> {
    await this.meetupService.deleteMeetup(EntityId.create(request.params.id))
  }
}
