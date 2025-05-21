import { DomainEventSubscriber } from "./Events/DomainEventSubscriber"
import { DomainEvent } from "./Events/DomainEvent"

export class DomainEventSubscribers {
  constructor(readonly items: DomainEventSubscriber<DomainEvent>[]) {}

  static from(
    subscribers: DomainEventSubscriber<DomainEvent>[]
  ): DomainEventSubscribers {
    return new DomainEventSubscribers(subscribers)
  }
}
