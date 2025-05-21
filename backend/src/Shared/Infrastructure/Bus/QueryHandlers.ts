import { Query } from "../../Domain/Query"
import { QueryHandler } from "../../Domain/QueryHandler"
import { Response } from "../../Domain/Response"
import { QueryNotRegisteredError } from "../../Domain/QueryNotRegisteredError"

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
