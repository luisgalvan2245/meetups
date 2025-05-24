import { DomainEvent } from './DomainEvent'
import { DomainEventSubscribers } from './DomainEventSubscribers'

export interface EventBus {
  publish(events: DomainEvent[]): Promise<void>
  addSubscribers(subscribers: DomainEventSubscribers): void
}
