import { QueryHandler } from '../../../Shared/domain/QueryHandler'
import { GetUser } from './GetUser'
import { GetUserQuery } from './GetUserQuery'

export class GetUserQueryHandler
  implements QueryHandler<GetUserQuery, Record<string, unknown>>
{
  constructor(private getter: GetUser) {}

  subscribedTo(): GetUserQuery {
    return GetUserQuery
  }

  async handle(query: GetUserQuery): Promise<Record<string, unknown>> {
    const user = await this.getter.run({ id: query.id })
    return user.toPrimitives()
  }
}
