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
  ): Promise<void> {
    await this.service.createMeetup({ id, ...data })
  }
}
