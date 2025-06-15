import { EventEmitter } from 'events'

import { DomainEvent } from '../../domain/events/DomainEvent'
import { DomainEventSubscribers } from '../../domain/events/DomainEventSubscribers'
import { EventBus } from '../../domain/events/EventBus'

export class InMemoryEventBus extends EventEmitter implements EventBus {
  async publish(events: DomainEvent[]): Promise<void> {
    events.forEach(event => this.emit(event.eventName, event))
  }

  addSubscribers(subscribers: DomainEventSubscribers): void {
    subscribers.items.forEach(subscriber => {
      subscriber.subscribedTo().forEach(eventClass => {
        this.on(eventClass.EVENT_NAME, subscriber.on.bind(subscriber))
      })
    })
  }
}
