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
  @Response(422, "Validation Error")
  public async deleteMeetup(@Path() id: string): Promise<void> {
    await this.service.deleteMeetup(new MeetupId(id))
  }
}
