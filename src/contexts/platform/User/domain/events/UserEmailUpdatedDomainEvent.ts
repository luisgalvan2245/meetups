import { DomainEvent } from '../../../Shared/domain/eventsDomainEvent'

export class UserEmailUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'user.email.updated'

  constructor(params: {
    aggregateId: string
    email: string
    eventId?: string
    occurredOn?: Date
  }) {
    const { aggregateId, email, eventId, occurredOn } = params
    super(
      UserEmailUpdatedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn
    )
    this.email = email
  }

  readonly email: string

  toPrimitives(): Record<string, unknown> {
    return {
      email: this.email
    }
  }
}
