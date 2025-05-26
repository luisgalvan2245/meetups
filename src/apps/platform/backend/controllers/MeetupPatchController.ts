import { InMemoryMeetupRepository } from '../../../../contexts/platform/Meetup/infrastructure/Persistance/InMemoryMeetupRepository'
import { UpdateMeetupCommand } from '../../../../contexts/platform/Meetup/application/Update/UpdateMeetupCommand'
import { UpdateMeetupCommandHandler } from '../../../../contexts/platform/Meetup/application/Update/UpdateMeetupCommandHandler'
import { MeetupUpdater } from '../../../../contexts/platform/Meetup/application/Update/MeetupUpdater'
import { InMemoryCommandBus } from '../../../../contexts/platform/Shared/infrastructure/Bus/CommandBus/InMemoryCommandBus'
import { CommandHandlers } from '../../../../contexts/platform/Shared/infrastructure/Bus/CommandBus/CommandHandlers'
import { InMemoryAsyncEventBus } from '../../../../contexts/platform/Shared/infrastructure/Bus/EventBus/InMemoryAsyncEventBus'
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
