import { Query } from '../../../shared/domain/query/Query'
import { QueryHandler } from '../../../shared/domain/query/QueryHandler'
import { TicketId } from '../../domain/value-objects/TicketId'
import { TicketResponse } from '../TicketResponse'
import { GetTicketQuery } from './GetTicketQuery'
import { TicketGetter } from './TicketGetter'

export class GetTicketQueryHandler
  implements QueryHandler<GetTicketQuery, TicketResponse>
{
  constructor(private getter: TicketGetter) {}

  subscribedTo(): Query {
    return GetTicketQuery
  }

  async handle(query: GetTicketQuery): Promise<TicketResponse> {
    const ticket = await this.getter.run(new TicketId(query.id))
    return ticket.toPrimitives()
  }
}
