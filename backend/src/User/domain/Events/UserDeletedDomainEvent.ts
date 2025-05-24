import { DomainEvent } from '../../../Shared/domain/DomainEvent'

export class UserDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'user.deleted'

  constructor(data: { aggregateId: string }) {
    super(UserDeletedDomainEvent.EVENT_NAME, data.aggregateId, data)
  }
}
