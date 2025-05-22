import { InMemoryMeetupRepository } from "../../../Meetup/infrastructure/Repositories/InMemoryMeetupRepository"
import { CreateMeetupCommand } from "../../application/CreateMeetup/CreateMeetupCommand"
import { CreateMeetupCommandHandler } from "../../application/CreateMeetup/CreateMeetupCommandHandler"
import { MeetupCreator } from "../../application/CreateMeetup/MeetupCreator"
import { InMemoryCommandBus } from "../../../Shared/infrastructure/Bus/InMemoryCommandBus"
import { CommandHandlers } from "../../../Shared/infrastructure/Bus/CommandHandlers"
import { InMemoryAsyncEventBus } from "../../../Shared/infrastructure/Bus/InMemoryAsyncEventBus"
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
  private commandBus: InMemoryCommandBus

  constructor() {
    // TODO: Inject CommandBus
    const repository = new InMemoryMeetupRepository()
    const eventBus = new InMemoryAsyncEventBus()
    const creator = new MeetupCreator(repository, eventBus)
    const handler = new CreateMeetupCommandHandler(creator)
    const handlers = new CommandHandlers([handler])
    this.commandBus = new InMemoryCommandBus(handlers)
  }

  @Put("{id}")
  @SuccessResponse(201, "Created")
  @Response(400, "Bad Request")
  @Response(422, "Unprocessable Entity")
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
    const command = new CreateMeetupCommand({ id, ...data })
    await this.commandBus.dispatch(command)
  }
}
