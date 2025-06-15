import { Route, Tags, SuccessResponse, Delete, Path, Response } from '@tsoa/runtime'

import { DeleteTicketCommand } from '../../../../../contexts/platform/meetup/application/delete/DeleteTicketCommand'
import { CommandBus } from '../../../../../contexts/platform/shared/domain/command/CommandBus'
import { container } from '../../../../../contexts/platform/shared/infrastructure/dependencies/container'

@Route('tickets')
@Tags('Tickets')
export class TicketDeleteController {
  constructor(private bus: CommandBus = container.meetup.commandBus) {}

  @Delete('{id}')
  @SuccessResponse(204, 'No Content')
  @Response(400, 'Bad Request')
  @Response(404, 'Not Found')
  async deleteTicket(@Path() id: string): Promise<void> {
    const command = new DeleteTicketCommand({ id })
    await this.bus.dispatch(command)
  }
}
