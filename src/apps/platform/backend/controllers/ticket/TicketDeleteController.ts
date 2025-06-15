import { Route, Tags, SuccessResponse, Delete, Path, Response } from '@tsoa/runtime'
import { Request } from 'express'

import { DeleteTicketCommand } from '../../../../../backend/platform/ticket/application/delete/DeleteTicketCommand'
import { CommandBus } from '../../../../../backend/platform/shared/domain/command/CommandBus'
import { container } from '../../../../../backend/platform/shared/infrastructure/dependencies/container'

@Route('tickets')
@Tags('Tickets')
export class TicketDeleteController {
  constructor(private bus: CommandBus = container.ticket.commandBus) {}

  @Delete('{id}')
  @SuccessResponse(204, 'No Content')
  @Response(400, 'Bad Request')
  @Response(404, 'Not Found')
  async deleteTicket(@Path() id: string): Promise<void> {
    const command = new DeleteTicketCommand({ id })
    await this.bus.dispatch(command)
  }
}
