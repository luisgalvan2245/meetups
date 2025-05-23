import { InMemoryMeetupRepository } from "../../../Meetup/infrastructure/Repositories/InMemoryMeetupRepository"
import { UpdateMeetupCommand } from "../../application/UpdateMeetup/UpdateMeetupCommand"
import { UpdateMeetupCommandHandler } from "../../application/UpdateMeetup/UpdateMeetupCommandHandler"
import { MeetupUpdater } from "../../application/UpdateMeetup/MeetupUpdater"
import { InMemoryCommandBus } from "../../../Shared/infrastructure/CommandBus/InMemoryCommandBus"
import { CommandHandlers } from "../../../Shared/infrastructure/CommandBus/CommandHandlers"
import { InMemoryAsyncEventBus } from "../../../Shared/infrastructure/EventBus/InMemoryAsyncEventBus"
import {
  Route,
  Tags,
  Patch,
  Path,
  Body,
  Response,
  SuccessResponse
} from "@tsoa/runtime"

@Route("meetups")
@Tags("Meetups")
export class MeetupPatchController {
  private commandBus: InMemoryCommandBus

  constructor() {
    // TODO: Inject CommandBus
    const repository = new InMemoryMeetupRepository()
    const eventBus = new InMemoryAsyncEventBus()
    const updater = new MeetupUpdater(repository, eventBus)
    const handler = new UpdateMeetupCommandHandler(updater)
    const handlers = new CommandHandlers([handler])
    this.commandBus = new InMemoryCommandBus(handlers)
  }

  @Patch("{id}")
  @SuccessResponse(204, "No Content")
  @Response(400, "Bad Request")
  @Response(404, "Not Found")
  @Response(422, "Unprocessable Entity")
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
    const command = new UpdateMeetupCommand({ id, ...data })
    await this.commandBus.dispatch(command)
  }
}
