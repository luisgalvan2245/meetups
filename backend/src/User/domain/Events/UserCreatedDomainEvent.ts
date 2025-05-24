import { DomainEvent } from '../../../Shared/domain/DomainEvent'

export class UserCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'user.created'

  constructor(data: {
    aggregateId: string
    username: string
    email: string
    role: string
  }) {
    super(UserCreatedDomainEvent.EVENT_NAME, data.aggregateId, data)
  }
}
