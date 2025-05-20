import { InMemoryMeetupRepository } from "../repositories/InMemoryMeetupRepository"
import {
  Route,
  Tags,
  Patch,
  Path,
  Body,
  Response,
  SuccessResponse
} from "@tsoa/runtime"
import { MeetupUpdater } from "../../application/Update/MeetupUpdater"

@Route("meetups")
@Tags("Meetups")
export class MeetupPatchController {
  private updater: MeetupUpdater

  constructor() {
    const repository = new InMemoryMeetupRepository()
    this.updater = new MeetupUpdater(repository)
  }

  @Patch("{id}")
  @SuccessResponse(204, "No Content")
  @Response(400, "Bad Request")
  @Response(404, "Not found")
  @Response(422, "Validation Error")
  async updateMeetup(
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
    await this.updater.run(id, data)
  }
}
