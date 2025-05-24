import { DomainEvent } from '../../../Shared/domain/DomainEvent'

export class CommentUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'comment.updated'

  constructor(data: { aggregateId: string; content: string }) {
    super(CommentUpdatedDomainEvent.EVENT_NAME, data.aggregateId, data)
  }
}
