import { Route, Tags, SuccessResponse, Body, Put, Path, Response } from '@tsoa/runtime'
import { Request } from 'express'

import { CreateTicketCommand } from '../../../../../backend/platform/ticket/application/create/CreateTicketCommand'
import { container } from '../../../../../backend/platform/shared/infrastructure/dependencies/container'
import { CommandBus } from '../../../../../backend/platform/shared/domain/command/CommandBus'

@Route('tickets')
@Tags('Tickets')
export class TicketPutController {
  constructor(private bus: CommandBus = container.ticket.commandBus) {}

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
