import { MeetupService } from "@/meetup/application/services/MeetupService"
import { InMemoryMeetupRepository } from "@/meetup/infrastructure/repositories/InMemoryMeetupRepository"
import {
  Route,
  Tags,
  Put,
  Path,
  Body,
  Response,
  SuccessResponse
} from "@tsoa/runtime"
import { validate as uuidValidate } from "uuid"
import { MeetupModel } from "./MeetupGetController"

@Route("meetups")
@Tags("Meetups")
export class MeetupPutController {
  private service: MeetupService

  constructor() {
    const repository = new InMemoryMeetupRepository()
    this.service = new MeetupService(repository)
  }

  @Put("{id}")
  @SuccessResponse(201, "Created")
  @Response(400, "Bad Request")
  public async createMeetup(
    @Path() id: string,
    @Body()
    data: {
      title: string
      description: string
      date: Date
      location: string
      imageUrl: string
    }
  ): Promise<MeetupModel> {
    if (!uuidValidate(id)) {
      throw { status: 400, message: "Invalid UUID format" }
    }

    const meetup = await this.service.createMeetup({ id, ...data })
    return meetup.toPrimitives()
  }
}
