import { Query } from '../../../shared/domain/query/Query'
import { QueryHandler } from '../../../shared/domain/query/QueryHandler'
import { TicketResponse } from '../TicketResponse'
import { ListTicketsQuery } from './ListTicketsQuery'
import { TicketsLister } from './TicketsLister'

export class ListTicketsQueryHandler
  implements QueryHandler<ListTicketsQuery, TicketResponse[]>
{
  constructor(private lister: TicketsLister) {}

  subscribedTo(): Query {
    return ListTicketsQuery
  }

  async handle(_query: ListTicketsQuery): Promise<TicketResponse[]> {
    const tickets = await this.lister.run()
    return tickets.map(ticket => ticket.toPrimitives())
  }
}
