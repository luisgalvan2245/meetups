import { DomainEvent } from '../../../shared/domain/events/DomainEvent'

type TicketDescriptionUpdatedDomainEventAttributes = {
  readonly description: string
}

export class TicketDescriptionUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'ticket.description.updated'

  readonly description: string

  constructor({
    aggregateId,
    description,
    eventId,
    occurredOn
  }: {
    aggregateId: string
    eventId?: string
    description: string
    occurredOn?: Date
  }) {
    super({
      eventName: TicketDescriptionUpdatedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn
    })
    this.description = description
  }

  toPrimitives(): TicketDescriptionUpdatedDomainEventAttributes {
    const { description } = this
    return {
      description
    }
  }

  static fromPrimitives(params: {
    aggregateId: string
    attributes: TicketDescriptionUpdatedDomainEventAttributes
    eventId: string
    occurredOn: Date
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params
    return new TicketDescriptionUpdatedDomainEvent({
      aggregateId,
      description: attributes.description,
      eventId,
      occurredOn
    })
  }
}
