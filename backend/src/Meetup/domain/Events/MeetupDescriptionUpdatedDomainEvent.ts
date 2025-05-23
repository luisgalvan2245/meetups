import { DomainEvent } from '../../../Shared/domain/Bus/EventBus/DomainEvent';

type MeetupDescriptionUpdatedDomainEventAttributes = {
  readonly description: string;
};

export class MeetupDescriptionUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'meetup.description.updated';

  readonly description: string;

  constructor({
    aggregateId,
    description,
    eventId,
    occurredOn,
  }: {
    aggregateId: string;
    eventId?: string;
    description: string;
    occurredOn?: Date;
  }) {
    super({
      eventName: MeetupDescriptionUpdatedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn,
    });
    this.description = description;
  }

  toPrimitives(): MeetupDescriptionUpdatedDomainEventAttributes {
    const { description } = this;
    return {
      description,
    };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: MeetupDescriptionUpdatedDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new MeetupDescriptionUpdatedDomainEvent({
      aggregateId,
      description: attributes.description,
      eventId,
      occurredOn,
    });
  }
}
