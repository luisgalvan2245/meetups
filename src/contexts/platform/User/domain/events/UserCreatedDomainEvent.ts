import { DomainEvent } from '../../../Shared/domain/eventsDomainEvent'

type UserCreatedDomainEventAttributes = {
  readonly name: string
  readonly email: string
}

export class UserCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'user.created'

  constructor(params: {
    aggregateId: string
    name: string
    email: string
    eventId?: string
    occurredOn?: Date
  }) {
    const { aggregateId, name, email, eventId, occurredOn } = params
    super(UserCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn)
    this.name = name
    this.email = email
  }

  readonly name: string
  readonly email: string

  toPrimitives(): Record<string, unknown> {
    return {
      name: this.name,
      email: this.email
    }
  }
}
