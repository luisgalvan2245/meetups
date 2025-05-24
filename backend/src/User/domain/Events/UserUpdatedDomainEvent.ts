import { DomainEvent } from '../../../Shared/domain/DomainEvent'

export class UserUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'user.updated'

  constructor(data: {
    aggregateId: string
    username?: string
    email?: string
    password?: string
    role?: string
  }) {
    super(UserUpdatedDomainEvent.EVENT_NAME, data.aggregateId, data)
  }
}
