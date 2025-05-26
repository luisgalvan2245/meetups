import { DomainEvent } from '../../../Shared/domain/bus/EventBus/DomainEvent'

type MeetupImageUrlUpdatedDomainEventAttributes = {
  readonly imageUrl: string
}

export class MeetupImageUrlUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'meetup.imageUrl.updated'

  readonly imageUrl: string

  constructor({
    aggregateId,
    imageUrl,
    eventId,
    occurredOn
  }: {
    aggregateId: string
    eventId?: string
    imageUrl: string
    occurredOn?: Date
  }) {
    super({
      eventName: MeetupImageUrlUpdatedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn
    })
    this.imageUrl = imageUrl
  }

  toPrimitives(): MeetupImageUrlUpdatedDomainEventAttributes {
    const { imageUrl } = this
    return {
      imageUrl
    }
  }

  static fromPrimitives(params: {
    aggregateId: string
    attributes: MeetupImageUrlUpdatedDomainEventAttributes
    eventId: string
    occurredOn: Date
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params
    return new MeetupImageUrlUpdatedDomainEvent({
      aggregateId,
      imageUrl: attributes.imageUrl,
      eventId,
      occurredOn
    })
  }
}
