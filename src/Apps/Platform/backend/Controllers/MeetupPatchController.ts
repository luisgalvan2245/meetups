import { InMemoryMeetupRepository } from '../../../../Contexts/Platform/Meetup/infrastructure/Persistance/InMemoryMeetupRepository'
import { UpdateMeetupCommand } from '../../../../Contexts/Platform/Meetup/application/Update/UpdateMeetupCommand'
import { UpdateMeetupCommandHandler } from '../../../../Contexts/Platform/Meetup/application/Update/UpdateMeetupCommandHandler'
import { MeetupUpdater } from '../../../../Contexts/Platform/Meetup/application/Update/MeetupUpdater'
import { InMemoryCommandBus } from '../../../../Contexts/Platform/Shared/infrastructure/Bus/CommandBus/InMemoryCommandBus'
import { CommandHandlers } from '../../../../Contexts/Platform/Shared/infrastructure/Bus/CommandBus/CommandHandlers'
import { InMemoryAsyncEventBus } from '../../../../Contexts/Platform/Shared/infrastructure/Bus/EventBus/InMemoryAsyncEventBus'
import {
  Route,
  Tags,
  Patch,
  Path,
  Body,
  Response,
  SuccessResponse,
} from '@tsoa/runtime'

@Route('meetups')
@Tags('Meetups')
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

  @Patch('{id}')
  @SuccessResponse(204, 'No Content')
  @Response(400, 'Bad Request')
  @Response(404, 'Not Found')
  @Response(422, 'Unprocessable Entity')
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
