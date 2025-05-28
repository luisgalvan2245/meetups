import { DomainEvent } from '../../../Shared/domain/events/DomainEvent'

export class UserNameUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'user.name.updated'

  constructor(params: {
    aggregateId: string
    name: string
    eventId?: string
    occurredOn?: Date
  }) {
    const { aggregateId, name, eventId, occurredOn } = params
    super(
      UserNameUpdatedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn
    )
    this.name = name
  }

  readonly name: string

  toPrimitives(): Record<string, unknown> {
    return {
      name: this.name
    }
  }
}
