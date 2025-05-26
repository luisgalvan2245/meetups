import { Response } from '../../../domain/Response'
import { Query } from '../../../domain/bus/QueryBus/Query'
import { QueryHandler } from '../../../domain/bus/QueryBus/QueryHandler'
import { QueryNotRegisteredError } from '../../../domain/exceptions/QueryNotRegisteredError'

export class QueryHandlers extends Map<Query, QueryHandler<Query, Response>> {
  constructor(queryHandlers: QueryHandler<Query, Response>[]) {
    super()
    queryHandlers.forEach(queryHandler => {
      this.set(queryHandler.subscribedTo(), queryHandler)
    })
  }

  get(query: Query): QueryHandler<Query, Response> {
    const queryHandler = super.get(query.constructor)

    if (!queryHandler) {
      throw new QueryNotRegisteredError(query)
    }

    return queryHandler
  }
}
