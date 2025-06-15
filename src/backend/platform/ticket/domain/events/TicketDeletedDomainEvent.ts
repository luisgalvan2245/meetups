import { DomainEvent } from '../../../shared/domain/events/DomainEvent'

type TicketDeletedDomainEventAttributes = {
  readonly aggregateId: string
}

export class TicketDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'ticket.deleted'

  readonly aggregateId: string

  constructor({
    aggregateId,
    eventId,
    occurredOn
  }: {
    aggregateId: string
    eventId?: string
    occurredOn?: Date
  }) {
    super({
      eventName: TicketDeletedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn
    })
    this.aggregateId = aggregateId
  }

  toPrimitives(): TicketDeletedDomainEventAttributes {
    return {
      aggregateId: this.aggregateId
    }
  }

  static fromPrimitives(params: {
    aggregateId: string
    attributes: TicketDeletedDomainEventAttributes
    eventId: string
    occurredOn: Date
  }): DomainEvent {
    const { aggregateId, occurredOn, eventId } = params
    return new TicketDeletedDomainEvent({
      aggregateId,
      eventId,
      occurredOn
    })
  }
}
