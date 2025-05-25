import { DomainEvent } from '../../../Shared/domain/DomainEvent'

export class UserPasswordUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'user.password.updated'

  constructor(params: {
    aggregateId: string
    eventId?: string
    occurredOn?: Date
  }) {
    const { aggregateId, eventId, occurredOn } = params
    super(
      UserPasswordUpdatedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn
    )
  }

  toPrimitives(): Record<string, unknown> {
    return {}
  }
}
