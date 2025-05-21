import { DomainEventSubscriber } from "./EventBus/DomainEventSubscriber"
import { DomainEvent } from "./EventBus/DomainEvent"

export class DomainEventSubscribers {
  constructor(readonly items: DomainEventSubscriber<DomainEvent>[]) {}

  static from(
    subscribers: DomainEventSubscriber<DomainEvent>[]
  ): DomainEventSubscribers {
    return new DomainEventSubscribers(subscribers)
  }
}
