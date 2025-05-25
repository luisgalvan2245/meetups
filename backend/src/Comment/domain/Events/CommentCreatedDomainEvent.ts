import { DomainEvent } from '../../../Shared/domain/Events/DomainEvent'

export class CommentCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'comment.created'

  constructor(data: {
    aggregateId: string
    content: string
    authorId: string
    meetupId: string
  }) {
    super(CommentCreatedDomainEvent.EVENT_NAME, data.aggregateId, data)
  }
}
