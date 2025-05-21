import { InMemoryMeetupRepository } from "../../../Meetup/infrastructure/Persistence/InMemoryMeetupRepository"
import { DeleteMeetupCommand } from "../../application/DeleteMeetup/DeleteMeetupCommand"
import { DeleteMeetupCommandHandler } from "../../application/DeleteMeetup/DeleteMeetupCommandHandler"
import { MeetupDeleter } from "../../application/DeleteMeetup/MeetupDeleter"
import { InMemoryCommandBus } from "../../../Shared/infrastructure/Bus/InMemoryCommandBus"
import { CommandHandlers } from "../../../Shared/infrastructure/Bus/CommandHandlers"
import { InMemoryAsyncEventBus } from "../../../Shared/infrastructure/Bus/InMemoryAsyncEventBus"
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
  private commandBus: InMemoryCommandBus

  constructor() {
    const repository = new InMemoryMeetupRepository()
    const eventBus = new InMemoryAsyncEventBus()
    const meetupDeleter = new MeetupDeleter(repository, eventBus)
    const deleteMeetupCommandHandler = new DeleteMeetupCommandHandler(
      meetupDeleter
    )

    const commandHandlers = new CommandHandlers([deleteMeetupCommandHandler])
    this.commandBus = new InMemoryCommandBus(commandHandlers)
  }

  @Delete("{id}")
  @SuccessResponse(204, "No Content")
  @Response(400, "Bad Request")
  @Response(404, "Not found")
  async deleteMeetup(@Path() id: string): Promise<void> {
    const command = new DeleteMeetupCommand({ id })
    await this.commandBus.dispatch(command)
  }
}
