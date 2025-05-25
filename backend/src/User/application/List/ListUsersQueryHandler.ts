import { Query } from '../../../Shared/domain/Bus/QueryBus/Query'
import { QueryHandler } from '../../../Shared/domain/Bus/QueryBus/QueryHandler'
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
