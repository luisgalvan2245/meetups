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
import { CreateMeetupCommand } from "../../application/Create/CreateMeetupCommand"
import { CreateMeetupCommandHandler } from "../../application/Create/CreateMeetupCommandHandler"
import { MeetupCreator } from "../../application/Create/MeetupCreator"
import { InMemoryCommandBus } from "../../../Shared/infrastructure/CommandBus/InMemoryCommandBus"
import { CommandHandlers } from "../../../Shared/infrastructure/CommandBus/CommandHandlers"
import { InMemoryAsyncEventBus } from "../../../Shared/infrastructure/EventBus/InMemoryAsyncEventBus"

@Route("meetups")
@Tags("Meetups")
export class MeetupPutController {
  private commandBus: InMemoryCommandBus

  constructor() {
    const repository = new InMemoryMeetupRepository()
    const eventBus = new InMemoryAsyncEventBus()
    const meetupCreator = new MeetupCreator(repository, eventBus)
    const createMeetupCommandHandler = new CreateMeetupCommandHandler(
      meetupCreator
    )

    const commandHandlers = new CommandHandlers([createMeetupCommandHandler])
    this.commandBus = new InMemoryCommandBus(commandHandlers)
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
    const command = new CreateMeetupCommand({ id, ...data })
    await this.commandBus.dispatch(command)
  }
}
