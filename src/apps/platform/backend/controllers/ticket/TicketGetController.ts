import { Route, Tags, Get, Path, Response } from '@tsoa/runtime'

import { ListTicketsQuery } from '../../../../../contexts/platform/meetup/application/list/ListTicketsQuery'
import { GetTicketQuery } from '../../../../../contexts/platform/meetup/application/get/GetTicketQuery'
import { TicketResponse } from '../../../../../contexts/platform/meetup/application/TicketResponse'
import { container } from '../../../../../contexts/platform/shared/infrastructure/dependencies/container'
import { QueryBus } from '../../../../../contexts/platform/shared/domain/query/QueryBus'

@Route('tickets')
@Tags('Tickets')
export class TicketGetController {
  constructor(private bus: QueryBus = container.meetup.queryBus) {}

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
