import { DomainEvent } from '../../../Shared/domain/Events/DomainEvent'

export class TagCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'tag.created'

  constructor(data: {
    aggregateId: string
    name: string
    description: string
  }) {
    super(TagCreatedDomainEvent.EVENT_NAME, data.aggregateId, data)
  }
}
