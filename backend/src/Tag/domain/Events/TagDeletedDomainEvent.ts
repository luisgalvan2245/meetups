import { DomainEvent } from '../../../Shared/domain/Events/DomainEvent'

export class TagDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'tag.deleted'

  constructor(data: { aggregateId: string }) {
    super(TagDeletedDomainEvent.EVENT_NAME, data.aggregateId, data)
  }
}
