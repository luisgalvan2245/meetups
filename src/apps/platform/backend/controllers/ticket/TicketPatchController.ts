import { Route, Tags, Patch, SuccessResponse, Response, Path, Body } from '@tsoa/runtime'

import { UpdateTicketCommand } from '../../../../../contexts/platform/ticket/application/update/UpdateTicketCommand'
import { container } from '../../../../../contexts/platform/shared/infrastructure/dependencies/container'
import { CommandBus } from '../../../../../contexts/platform/shared/domain/command/CommandBus'

@Route('tickets')
@Tags('Tickets')
export class TicketPatchController {
  constructor(private bus: CommandBus = container.ticket.commandBus) {}

  @Patch('{id}')
  @SuccessResponse(200, 'OK')
  @Response(400, 'Bad Request')
  @Response(404, 'Not Found')
  @Response(422, 'Unprocessable Entity')
  async updateTicket(
    @Path() id: string,
    @Body()
    data: {
      description?: string
    }
  ): Promise<void> {
    const command = new UpdateTicketCommand({ id, ...data })
    await this.bus.dispatch(command)
  }
}
