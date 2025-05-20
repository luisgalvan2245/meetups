import { InMemoryMeetupRepository } from "../repositories/InMemoryMeetupRepository"
import {
  Route,
  Tags,
  Put,
  Path,
  Body,
  Response,
  SuccessResponse
} from "@tsoa/runtime"
import { MeetupCreator } from "../../application/create/MeetupCreator"

@Route("meetups")
@Tags("Meetups")
export class MeetupPutController {
  private creator: MeetupCreator

  constructor() {
    const repository = new InMemoryMeetupRepository()
    this.creator = new MeetupCreator(repository)
  }

  @Put("{id}")
  @SuccessResponse(201, "Created")
  @Response(400, "Bad Request")
  @Response(422, "Validation Error")
  async createMeetup(
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
    await this.creator.run({ id, ...data })
  }
}
