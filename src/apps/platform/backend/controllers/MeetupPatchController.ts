import { Route, Tags, Patch, SuccessResponse, Response, Path, Body } from '@tsoa/runtime'

import { UpdateMeetupCommand } from '../../../../contexts/platform/Meetup/application/Update/UpdateMeetupCommand'
import { container } from '../../../../contexts/platform/Shared/infrastructure/dependencies/container'
import { CommandBus } from '../../../../contexts/platform/Shared/domain/Bus/CommandBus/CommandBus'

@Route('meetups')
@Tags('Meetups')
export class MeetupPatchController {
  constructor(private bus: CommandBus = container.resolve<CommandBus>('CommandBus')) {}

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
    await this.bus.dispatch(command)
  }
}
