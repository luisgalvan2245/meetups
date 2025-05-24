import { DomainEvent } from '../../../Shared/domain/DomainEvent'

export class CommentDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'comment.deleted'

  constructor(data: { aggregateId: string }) {
    super(CommentDeletedDomainEvent.EVENT_NAME, data.aggregateId, data)
  }
}
