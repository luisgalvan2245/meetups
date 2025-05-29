import { Query } from '../../../shared/domain/query/Query'
import { QueryHandler } from '../../../shared/domain/query/QueryHandler'
import { UserId } from '../../../shared/domain/value-objects/UserId'
import { UserResponse } from '../UserResponse'
import { GetUserQuery } from './GetUserQuery'
import { UserGetter } from './UserGetter'

export class GetUserQueryHandler
  implements QueryHandler<GetUserQuery, UserResponse>
{
  constructor(private getter: UserGetter) {}

  subscribedTo(): Query {
    return GetUserQuery
  }

  async handle(query: GetUserQuery): Promise<UserResponse> {
    const user = await this.getter.run(new UserId(query.id))
    return user.toPrimitives()
  }
}
