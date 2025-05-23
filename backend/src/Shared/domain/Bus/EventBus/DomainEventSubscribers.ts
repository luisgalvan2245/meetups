import { DomainEventSubscriber } from "./DomainEventSubscriber"
import { DomainEvent } from "./DomainEvent"

export class DomainEventSubscribers {
  constructor(readonly items: DomainEventSubscriber<DomainEvent>[]) {}

  static from(
    subscribers: DomainEventSubscriber<DomainEvent>[]
  ): DomainEventSubscribers {
    return new DomainEventSubscribers(subscribers)
  }
}
