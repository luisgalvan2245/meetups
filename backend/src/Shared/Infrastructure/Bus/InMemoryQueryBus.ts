import { Query } from "../../Domain/Query"
import { Response } from "../../Domain/Response"
import { QueryBus } from "../../Domain/QueryBus"
import { QueryHandlers } from "./QueryHandlers"

export class InMemoryQueryBus implements QueryBus {
  constructor(private queryHandlersInformation: QueryHandlers) {}

  async ask<R extends Response>(query: Query): Promise<R> {
    const handler = this.queryHandlersInformation.get(query)

    return (await handler.handle(query)) as Promise<R>
  }
}
