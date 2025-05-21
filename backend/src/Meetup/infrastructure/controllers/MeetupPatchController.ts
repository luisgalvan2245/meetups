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
import { UpdateMeetupCommand } from "../../application/Update/UpdateMeetupCommand"
import { UpdateMeetupCommandHandler } from "../../application/Update/UpdateMeetupCommandHandler"
import { MeetupUpdater } from "../../application/Update/MeetupUpdater"
import { InMemoryCommandBus } from "../../../Shared/infrastructure/CommandBus/InMemoryCommandBus"
import { CommandHandlers } from "../../../Shared/infrastructure/CommandBus/CommandHandlers"
import { InMemoryAsyncEventBus } from "../../../Shared/infrastructure/EventBus/InMemoryAsyncEventBus"

@Route("meetups")
@Tags("Meetups")
export class MeetupPatchController {
  private commandBus: InMemoryCommandBus

  constructor() {
    const repository = new InMemoryMeetupRepository()
    const eventBus = new InMemoryAsyncEventBus()
    const meetupUpdater = new MeetupUpdater(repository, eventBus)
    const updateMeetupCommandHandler = new UpdateMeetupCommandHandler(
      meetupUpdater
    )

    const commandHandlers = new CommandHandlers([updateMeetupCommandHandler])
    this.commandBus = new InMemoryCommandBus(commandHandlers)
  }

  @Patch("{id}")
  @SuccessResponse(204, "No Content")
  @Response(400, "Bad Request")
  @Response(404, "Not found")
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
