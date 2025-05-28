import { DomainEvent } from '../../../Shared/domain/events/DomainEvent'

export class UserPasswordUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'user.password.updated'

  constructor(params: { aggregateId: string }) {
    const { aggregateId } = params
    super(UserPasswordUpdatedDomainEvent.EVENT_NAME, aggregateId, {})
  }

  toPrimitives(): Record<string, unknown> {
    return {}
  }
}
