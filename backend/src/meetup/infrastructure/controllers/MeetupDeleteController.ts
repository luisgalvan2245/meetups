import { MeetupService } from "../../application/services/MeetupService"
import { InMemoryMeetupRepository } from "../repositories/InMemoryMeetupRepository"
import { MeetupId } from "../../../shared/domain/value-objects/MeetupId"
import {
  Route,
  Tags,
  Delete,
  Path,
  Response,
  SuccessResponse
} from "@tsoa/runtime"

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
  @Response(400, "Bad Request")
  @Response(404, "Not found")
  async deleteMeetup(@Path() id: string): Promise<void> {
    await this.service.deleteMeetup(new MeetupId(id))
  }
}
