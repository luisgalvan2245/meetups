import { DomainEvent } from '../../../Shared/domain/Events/DomainEvent'

export class UserDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'user.deleted'

  constructor(params: {
    aggregateId: string
    eventId?: string
    occurredOn?: Date
  }) {
    const { aggregateId, eventId, occurredOn } = params
    super(UserDeletedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn)
  }

  toPrimitives(): Record<string, unknown> {
    return {}
  }
}
