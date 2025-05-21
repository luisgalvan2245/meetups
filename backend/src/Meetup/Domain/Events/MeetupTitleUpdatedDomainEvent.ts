import { DomainEvent } from "@/Shared/Domain/Events/DomainEvent"

type MeetupTitleUpdatedDomainEventAttributes = {
  readonly title: string
}

export class MeetupTitleUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = "meetup.title.updated"

  readonly title: string

  constructor({
    aggregateId,
    title,
    eventId,
    occurredOn
  }: {
    aggregateId: string
    eventId?: string
    title: string
    occurredOn?: Date
  }) {
    super({
      eventName: MeetupTitleUpdatedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn
    })
    this.title = title
  }

  toPrimitives(): MeetupTitleUpdatedDomainEventAttributes {
    const { title } = this
    return {
      title
    }
  }

  static fromPrimitives(params: {
    aggregateId: string
    attributes: MeetupTitleUpdatedDomainEventAttributes
    eventId: string
    occurredOn: Date
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params
    return new MeetupTitleUpdatedDomainEvent({
      aggregateId,
      title: attributes.title,
      eventId,
      occurredOn
    })
  }
}
