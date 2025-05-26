import { InMemoryMeetupRepository } from '../../../../Contexts/Platform/Meetup/infrastructure/Persistance/InMemoryMeetupRepository'
import { CreateMeetupCommand } from '../../../../Contexts/Platform/Meetup/application/Create/CreateMeetupCommand'
import { CreateMeetupCommandHandler } from '../../../../Contexts/Platform/Meetup/application/Create/CreateMeetupCommandHandler'
import { MeetupCreator } from '../../../../Contexts/Platform/Meetup/application/Create/MeetupCreator'
import { InMemoryCommandBus } from '../../../../Contexts/Platform/Shared/infrastructure/Bus/CommandBus/InMemoryCommandBus'
import { CommandHandlers } from '../../../../Contexts/Platform/Shared/infrastructure/Bus/CommandBus/CommandHandlers'
import { InMemoryAsyncEventBus } from '../../../../Contexts/Platform/Shared/infrastructure/Bus/EventBus/InMemoryAsyncEventBus'
import {
  Route,
  Tags,
  Put,
  Path,
  Body,
  Response,
  SuccessResponse,
} from '@tsoa/runtime'

@Route('meetups')
@Tags('Meetups')
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

  @Put('{id}')
  @SuccessResponse(201, 'Created')
  @Response(400, 'Bad Request')
  @Response(422, 'Unprocessable Entity')
  async createMeetup(
    @Path() id: string,
    @Body()
    data: {
      title: string
      description: string
      date: Date
      location: string
      imageUrl: string
      organizerId: string
    }
  ): Promise<void> {
    const command = new CreateMeetupCommand({ id, ...data })
    await this.commandBus.dispatch(command)
  }
}
