import { InMemoryMeetupRepository } from '../../../../contexts/platform/Meetup/infrastructure/persistance/InMemoryMeetupRepository'
import { CreateMeetupCommand } from '../../../../contexts/platform/Meetup/application/Create/CreateMeetupCommand'
import { CreateMeetupCommandHandler } from '../../../../contexts/platform/Meetup/application/Create/CreateMeetupCommandHandler'
import { MeetupCreator } from '../../../../contexts/platform/Meetup/application/Create/MeetupCreator'
import { InMemoryCommandBus } from '../../../../contexts/platform/Shared/infrastructure/Bus/CommandBus/InMemoryCommandBus'
import { CommandHandlers } from '../../../../contexts/platform/Shared/infrastructure/Bus/CommandBus/CommandHandlers'
import { InMemoryAsyncEventBus } from '../../../../contexts/platform/Shared/infrastructure/Bus/EventBus/InMemoryAsyncEventBus'
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
