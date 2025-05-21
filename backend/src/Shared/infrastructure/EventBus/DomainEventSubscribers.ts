import { DomainEventSubscriber } from "../../domain/DomainEventSubscriber"
import { DomainEvent } from "../../domain/DomainEvent"

export class DomainEventSubscribers {
  constructor(
    public readonly items: Array<DomainEventSubscriber<DomainEvent>>
  ) {}

  static from(
    subscribers: Array<DomainEventSubscriber<DomainEvent>>
  ): DomainEventSubscribers {
    return new DomainEventSubscribers(subscribers)
  }
}
