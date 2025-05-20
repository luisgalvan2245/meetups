import { InMemoryMeetupRepository } from "../repositories/InMemoryMeetupRepository"
import {
  Route,
  Tags,
  Delete,
  Path,
  Response,
  SuccessResponse
} from "@tsoa/runtime"
import { MeetupDeleter } from "../../application/delete/MeetupDeleter"

@Route("meetups")
@Tags("Meetups")
export class MeetupDeleteController {
  private deleter: MeetupDeleter

  constructor() {
    const repository = new InMemoryMeetupRepository()
    this.deleter = new MeetupDeleter(repository)
  }

  @Delete("{id}")
  @SuccessResponse(204, "No Content")
  @Response(400, "Bad Request")
  @Response(404, "Not found")
  async deleteMeetup(@Path() id: string): Promise<void> {
    await this.deleter.run(id)
  }
}
