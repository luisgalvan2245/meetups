import { MeetupService } from "@/meetup/application/services/MeetupService"
import { InMemoryMeetupRepository } from "@/meetup/infrastructure/repositories/InMemoryMeetupRepository"
import { MeetupId } from "@/shared/domain/value-objects/MeetupId"
import {
  Route,
  Tags,
  Patch,
  Path,
  Body,
  Response,
  SuccessResponse
} from "@tsoa/runtime"
import { validate as uuidValidate } from "uuid"

@Route("meetups")
@Tags("Meetups")
export class MeetupPatchController {
  private service: MeetupService

  constructor() {
    const repository = new InMemoryMeetupRepository()
    this.service = new MeetupService(repository)
  }

  @Patch("{id}")
  @SuccessResponse(200, "Updated")
  @Response(404, "Not found")
  @Response(400, "Bad Request")
  public async updateMeetup(
    @Path() id: string,
    @Body()
    data: {
      title?: string
      description?: string
      date?: Date
      location?: string
      imageUrl?: string
    }
  ): Promise<void> {
    if (!uuidValidate(id)) {
      throw { status: 400, message: "Invalid UUID format" }
    }

    const meetup = await this.service.updateMeetup(new MeetupId(id), data)
    if (!meetup) {
      throw { status: 404, message: "Not found" }
    }
  }
}
