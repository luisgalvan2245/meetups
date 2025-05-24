import { DomainEvent } from '../../../Shared/domain/Bus/EventBus/DomainEvent'

type CreatedMeetupDomainEventAttributes = {
  readonly title: string
  readonly description: string
  readonly date: string
  readonly location: string
  readonly imageUrl: string
  readonly organizerId: string
}

export class MeetupCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'meetup.created'

  readonly title: string
  readonly description: string
  readonly date: string
  readonly location: string
  readonly imageUrl: string
  readonly organizerId: string

  constructor({
    aggregateId,
    title,
    description,
    date,
    location,
    imageUrl,
    organizerId,
    eventId,
    occurredOn
  }: {
    aggregateId: string
    eventId?: string
    title: string
    description: string
    date: string
    location: string
    imageUrl: string
    organizerId: string
    occurredOn?: Date
  }) {
    super({
      eventName: MeetupCreatedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn
    })
    this.title = title
    this.description = description
    this.date = date
    this.location = location
    this.imageUrl = imageUrl
    this.organizerId = organizerId
  }

  toPrimitives(): CreatedMeetupDomainEventAttributes {
    const { title, description, date, location, imageUrl } = this
    return {
      title,
      description,
      date,
      location,
      imageUrl,
      organizerId: ''
    }
  }

  static fromPrimitives(params: {
    aggregateId: string
    attributes: CreatedMeetupDomainEventAttributes
    eventId: string
    occurredOn: Date
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params
    return new MeetupCreatedDomainEvent({
      aggregateId,
      title: attributes.title,
      description: attributes.description,
      date: attributes.date,
      location: attributes.location,
      imageUrl: attributes.imageUrl,
      organizerId: attributes.organizerId,
      eventId,
      occurredOn
    })
  }
}
