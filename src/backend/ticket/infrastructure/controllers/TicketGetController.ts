import { Route, Tags, Get, Path, Response } from '@tsoa/runtime'

import { ListTicketsQuery } from '../../application/list/ListTicketsQuery'
import { GetTicketQuery } from '../../application/get/GetTicketQuery'
import { TicketResponse } from '../../application/TicketResponse'
import { container } from '../../../shared/infrastructure/dependencies/container'
import { QueryBus } from '../../../shared/domain/query/QueryBus'

@Route('tickets')
@Tags('Tickets')
export class TicketGetController {
  constructor(private bus: QueryBus = container.ticket.queryBus) {}

  @Get()
  async getAllTickets(): Promise<TicketResponse[]> {
    const query = new ListTicketsQuery()
    return await this.bus.ask(query)
  }

  @Get('{id}')
  @Response(400, 'Bad Request')
  @Response(404, 'Not Found')
  async getTicketById(@Path() id: string): Promise<TicketResponse> {
    const query = new GetTicketQuery({ id })
    return await this.bus.ask(query)
  }
}
