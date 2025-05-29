import { Route, Tags, SuccessResponse, Body, Put, Path, Response } from '@tsoa/runtime'

import { CreateMeetupCommand } from '../../../../../contexts/platform/meetup/application/create/CreateMeetupCommand'
import { container } from '../../../../../contexts/platform/shared/infrastructure/dependencies/container'
import { CommandBus } from '../../../../../contexts/platform/shared/domain/command/CommandBus'

@Route('meetups')
@Tags('Meetups')
export class MeetupPutController {
  constructor(private bus: CommandBus = container.meetup.commandBus) {}

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
    await this.bus.dispatch(command)
  }
}
