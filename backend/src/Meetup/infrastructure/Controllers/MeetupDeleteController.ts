import { InMemoryMeetupRepository } from '../../../Meetup/infrastructure/Repositories/InMemoryMeetupRepository'
import { DeleteMeetupCommand } from '../../application/Delete/DeleteMeetupCommand'
import { DeleteMeetupCommandHandler } from '../../application/Delete/DeleteMeetupCommandHandler'
import { MeetupDeleter } from '../../application/Delete/MeetupDeleter'
import { InMemoryCommandBus } from '../../../Shared/infrastructure/Bus/CommandBus/InMemoryCommandBus'
import { CommandHandlers } from '../../../Shared/infrastructure/Bus/CommandBus/CommandHandlers'
import { InMemoryAsyncEventBus } from '../../../Shared/infrastructure/Bus/EventBus/InMemoryAsyncEventBus'
import {
  Route,
  Tags,
  Delete,
  Path,
  Response,
  SuccessResponse,
} from '@tsoa/runtime'

@Route('meetups')
@Tags('Meetups')
export class MeetupDeleteController {
  private commandBus: InMemoryCommandBus

  constructor() {
    // TODO: Inject CommandBus
    const repository = new InMemoryMeetupRepository()
    const eventBus = new InMemoryAsyncEventBus()
    const deleter = new MeetupDeleter(repository, eventBus)
    const handler = new DeleteMeetupCommandHandler(deleter)
    const handlers = new CommandHandlers([handler])
    this.commandBus = new InMemoryCommandBus(handlers)
  }

  @Delete('{id}')
  @SuccessResponse(204, 'No Content')
  @Response(400, 'Bad Request')
  @Response(404, 'Not Found')
  async deleteMeetup(@Path() id: string): Promise<void> {
    const command = new DeleteMeetupCommand({ id })
    await this.commandBus.dispatch(command)
  }
}
