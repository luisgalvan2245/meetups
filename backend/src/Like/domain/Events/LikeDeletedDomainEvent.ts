import { DomainEvent } from '../../../Shared/domain/DomainEvent'

export class LikeDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'like.deleted'

  constructor(data: { aggregateId: string }) {
    super(LikeDeletedDomainEvent.EVENT_NAME, data.aggregateId, data)
  }
}
