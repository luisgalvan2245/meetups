import { DomainEvent } from '../../../Shared/domain/DomainEvent'

export class TagUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'tag.updated'

  constructor(data: {
    aggregateId: string
    name?: string
    description?: string
  }) {
    super(TagUpdatedDomainEvent.EVENT_NAME, data.aggregateId, data)
  }
}
