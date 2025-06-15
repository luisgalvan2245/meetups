import { Route, Tags, SuccessResponse, Body, Put, Path, Response } from '@tsoa/runtime'

import { CreateTicketCommand } from '../../../../../contexts/platform/meetup/application/create/CreateTicketCommand'
import { container } from '../../../../../contexts/platform/shared/infrastructure/dependencies/container'
import { CommandBus } from '../../../../../contexts/platform/shared/domain/command/CommandBus'

@Route('tickets')
@Tags('Tickets')
export class TicketPutController {
  constructor(private bus: CommandBus = container.meetup.commandBus) {}

  @Put('{id}')
  @SuccessResponse(201, 'Created')
  @Response(400, 'Bad Request')
  @Response(422, 'Unprocessable Entity')
  async createTicket(
    @Path() id: string,
    @Body()
    data: {
      description: string
    }
  ): Promise<void> {
    const command = new CreateTicketCommand({ id, ...data })
    await this.bus.dispatch(command)
  }
}
