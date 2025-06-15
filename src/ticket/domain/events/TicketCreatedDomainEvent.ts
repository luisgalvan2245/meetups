import { DomainEvent } from '../../../shared/domain/events/DomainEvent'

type Attributes = {
  readonly description: string
}

export class TicketCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'ticket.created'

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
      eventName: TicketCreatedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn
    })
    this.description = description
  }

  toPrimitives(): Attributes {
    const { description } = this
    return {
      description
    }
  }

  static fromPrimitives(params: {
    aggregateId: string
    attributes: Attributes
    eventId: string
    occurredOn: Date
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params
    return new TicketCreatedDomainEvent({
      aggregateId,
      description: attributes.description,
      eventId,
      occurredOn
    })
  }
}
