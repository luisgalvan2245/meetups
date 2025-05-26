import { Query } from '../../../Shared/domain/Bus/QueryBus/Query'
import { QueryHandler } from '../../../Shared/domain/Bus/QueryBus/QueryHandler'
import { UserId } from '../../../Shared/domain/ValueObjects/UserId'
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
