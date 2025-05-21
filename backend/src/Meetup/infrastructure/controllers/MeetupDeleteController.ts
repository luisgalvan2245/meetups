import { InMemoryMeetupRepository } from "../repositories/InMemoryMeetupRepository"
import {
  Route,
  Tags,
  Delete,
  Path,
  Response,
  SuccessResponse
} from "@tsoa/runtime"
import { DeleteMeetupCommand } from "../../application/Delete/DeleteMeetupCommand"
import { DeleteMeetupCommandHandler } from "../../application/Delete/DeleteMeetupCommandHandler"
import { MeetupDeleter } from "../../application/Delete/MeetupDeleter"
import { InMemoryCommandBus } from "../../../Shared/infrastructure/CommandBus/InMemoryCommandBus"
import { CommandHandlers } from "../../../Shared/infrastructure/CommandBus/CommandHandlers"
import { InMemoryAsyncEventBus } from "../../../Shared/infrastructure/EventBus/InMemoryAsyncEventBus"

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
