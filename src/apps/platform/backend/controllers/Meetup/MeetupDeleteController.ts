import { Route, Tags, SuccessResponse, Delete, Path, Response } from '@tsoa/runtime'

import { DeleteMeetupCommand } from '../../../../../contexts/platform/Meetup/application/Delete/DeleteMeetupCommand'
import { CommandBus } from '../../../../../contexts/platform/Shared/domain/bus/CommandBus/CommandBus'
import { container } from '../../../../../contexts/platform/Shared/infrastructure/dependencies/container'

@Route('meetups')
@Tags('Meetups')
export class MeetupDeleteController {
  constructor(private bus: CommandBus = container.meetup.commandBus) {}

  @Delete('{id}')
  @SuccessResponse(204, 'No Content')
  @Response(400, 'Bad Request')
  @Response(404, 'Not Found')
  async deleteMeetup(@Path() id: string): Promise<void> {
    const command = new DeleteMeetupCommand({ id })
    await this.bus.dispatch(command)
  }
}
