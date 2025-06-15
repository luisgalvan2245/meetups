import { Route, Tags, Get, Path, Response } from '@tsoa/runtime'
import { Request } from 'express'

import { ListTicketsQuery } from '../../../../../backend/platform/ticket/application/list/ListTicketsQuery'
import { GetTicketQuery } from '../../../../../backend/platform/ticket/application/get/GetTicketQuery'
import { TicketResponse } from '../../../../../backend/platform/ticket/application/TicketResponse'
import { container } from '../../../../../backend/platform/shared/infrastructure/dependencies/container'
import { QueryBus } from '../../../../../backend/platform/shared/domain/query/QueryBus'

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
