import { Query } from '../../../shared/domain/query/Query'
import { QueryHandler } from '../../../shared/domain/query/QueryHandler'
import { UserResponse } from '../UserResponse'
import { ListUsersQuery } from './ListUsersQuery'
import { UsersLister } from './UsersLister'

export class ListUsersQueryHandler
  implements QueryHandler<ListUsersQuery, UserResponse[]>
{
  constructor(private lister: UsersLister) {}

  subscribedTo(): Query {
    return ListUsersQuery
  }

  async handle(_query: ListUsersQuery): Promise<UserResponse[]> {
    const users = await this.lister.run()
    return users.map(user => user.toPrimitives())
  }
}
