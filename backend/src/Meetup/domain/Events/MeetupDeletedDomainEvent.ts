import { DomainEvent } from "../../../Shared/domain/Events/DomainEvent"

type MeetupDeletedDomainEventAttributes = {
  readonly aggregateId: string
}

export class MeetupDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = "meetup.deleted"

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
      eventName: MeetupDeletedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn
    })
    this.aggregateId = aggregateId
  }

  toPrimitives(): MeetupDeletedDomainEventAttributes {
    return {
      aggregateId: this.aggregateId
    }
  }

  static fromPrimitives(params: {
    aggregateId: string
    attributes: MeetupDeletedDomainEventAttributes
    eventId: string
    occurredOn: Date
  }): DomainEvent {
    const { aggregateId, occurredOn, eventId } = params
    return new MeetupDeletedDomainEvent({
      aggregateId,
      eventId,
      occurredOn
    })
  }
}
