import { QueryHandler } from '../../../Shared/domain/QueryHandler'
import { ListUsers } from './ListUsers'
import { ListUsersQuery } from './ListUsersQuery'

export class ListUsersQueryHandler
  implements QueryHandler<ListUsersQuery, Record<string, unknown>[]>
{
  constructor(private lister: ListUsers) {}

  subscribedTo(): ListUsersQuery {
    return ListUsersQuery
  }

  async handle(): Promise<Record<string, unknown>[]> {
    const users = await this.lister.run()
    return users.map(user => user.toPrimitives())
  }
}
