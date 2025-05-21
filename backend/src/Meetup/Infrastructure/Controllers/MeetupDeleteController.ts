import { InMemoryMeetupRepository } from "../../../Meetup/Infrastructure/Persistence/InMemoryMeetupRepository"
import { DeleteMeetupCommand } from "../../Application/Commands/DeleteMeetup/DeleteMeetupCommand"
import { DeleteMeetupCommandHandler } from "../../Application/Commands/DeleteMeetup/DeleteMeetupCommandHandler"
import { MeetupDeleter } from "../../Application/Commands/DeleteMeetup/MeetupDeleter"
import { InMemoryCommandBus } from "../../../Shared/Infrastructure/Bus/InMemoryCommandBus"
import { CommandHandlers } from "../../../Shared/Infrastructure/Bus/CommandHandlers"
import { InMemoryAsyncEventBus } from "../../../Shared/Infrastructure/Bus/InMemoryAsyncEventBus"
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
