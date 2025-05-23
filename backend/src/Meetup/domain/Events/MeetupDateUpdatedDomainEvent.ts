import { DomainEvent } from '../../../Shared/domain/Bus/EventBus/DomainEvent'

type MeetupDateUpdatedDomainEventAttributes = {
  readonly date: string
}

export class MeetupDateUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'meetup.date.updated'

  readonly date: string

  constructor({
    aggregateId,
    date,
    eventId,
    occurredOn,
  }: {
    aggregateId: string
    eventId?: string
    date: string
    occurredOn?: Date
  }) {
    super({
      eventName: MeetupDateUpdatedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn,
    })
    this.date = date
  }

  toPrimitives(): MeetupDateUpdatedDomainEventAttributes {
    const { date } = this
    return {
      date,
    }
  }

  static fromPrimitives(params: {
    aggregateId: string
    attributes: MeetupDateUpdatedDomainEventAttributes
    eventId: string
    occurredOn: Date
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params
    return new MeetupDateUpdatedDomainEvent({
      aggregateId,
      date: attributes.date,
      eventId,
      occurredOn,
    })
  }
}
