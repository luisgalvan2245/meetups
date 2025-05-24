import { DomainEvent } from '../../../Shared/domain/DomainEvent'

export class LikeCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'like.created'

  constructor(data: { aggregateId: string; userId: string; meetupId: string }) {
    super(LikeCreatedDomainEvent.EVENT_NAME, data.aggregateId, data)
  }
}
