import { DomainEvent } from "../../../Shared/domain/EventBus/DomainEvent"

type MeetupLocationUpdatedDomainEventAttributes = {
  readonly location: string
}

export class MeetupLocationUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = "meetup.location.updated"

  readonly location: string

  constructor({
    aggregateId,
    location,
    eventId,
    occurredOn
  }: {
    aggregateId: string
    eventId?: string
    location: string
    occurredOn?: Date
  }) {
    super({
      eventName: MeetupLocationUpdatedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn
    })
    this.location = location
  }

  toPrimitives(): MeetupLocationUpdatedDomainEventAttributes {
    const { location } = this
    return {
      location
    }
  }

  static fromPrimitives(params: {
    aggregateId: string
    attributes: MeetupLocationUpdatedDomainEventAttributes
    eventId: string
    occurredOn: Date
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params
    return new MeetupLocationUpdatedDomainEvent({
      aggregateId,
      location: attributes.location,
      eventId,
      occurredOn
    })
  }
}
