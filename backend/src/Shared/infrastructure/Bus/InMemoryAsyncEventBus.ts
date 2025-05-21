import { EventEmitter } from "events"
import { DomainEvent } from "../../domain/Events/DomainEvent"
import { EventBus } from "../../domain/Events/EventBus"
import { DomainEventSubscribers } from "../../domain/DomainEventSubscribers"

export class InMemoryAsyncEventBus extends EventEmitter implements EventBus {
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
