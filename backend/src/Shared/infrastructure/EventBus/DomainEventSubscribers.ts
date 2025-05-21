import { DomainEventSubscriber } from "../../domain/DomainEventSubscriber"
import { DomainEvent } from "../../domain/DomainEvent"

export class DomainEventSubscribers {
  constructor(readonly items: DomainEventSubscriber<DomainEvent>[]) {}

  static from(
    subscribers: DomainEventSubscriber<DomainEvent>[]
  ): DomainEventSubscribers {
    return new DomainEventSubscribers(subscribers)
  }
}
