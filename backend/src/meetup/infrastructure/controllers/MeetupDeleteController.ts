import { MeetupService } from "@/meetup/application/services/MeetupService"
import { InMemoryMeetupRepository } from "@/meetup/infrastructure/repositories/InMemoryMeetupRepository"
import { MeetupId } from "@/shared/domain/value-objects/MeetupId"
import {
  Route,
  Tags,
  Delete,
  Path,
  Response,
  SuccessResponse
} from "@tsoa/runtime"
import { validate as uuidValidate } from "uuid"

@Route("meetups")
@Tags("Meetups")
export class MeetupDeleteController {
  private service: MeetupService

  constructor() {
    const repository = new InMemoryMeetupRepository()
    this.service = new MeetupService(repository)
  }

  @Delete("{id}")
  @SuccessResponse(204, "No Content")
  @Response(404, "Not found")
  @Response(400, "Bad Request")
  public async deleteMeetup(@Path() id: string): Promise<void> {
    if (!uuidValidate(id)) {
      throw { status: 400, message: "Invalid UUID format" }
    }

    const meetup = await this.service.getMeetupById(new MeetupId(id))
    if (!meetup) {
      throw { status: 404, message: "Not found" }
    }

    await this.service.deleteMeetup(new MeetupId(id))
  }
}
