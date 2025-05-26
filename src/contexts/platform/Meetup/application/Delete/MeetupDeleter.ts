import { EventBus } from '../../../Shared/domain/bus/EventBus/EventBus'
import { MeetupRepository } from '../../domain/persistance/MeetupRepository'
import { MeetupFinder } from '../../domain/services/MeetupFinder'
import { MeetupId } from '../../domain/value-objects/MeetupId'

export class MeetupDeleter {
  private finder: MeetupFinder

  constructor(
    private repository: MeetupRepository,
    private eventBus: EventBus
  ) {
    this.finder = new MeetupFinder(repository)
  }

  async run(id: MeetupId): Promise<void> {
    const meetup = await this.finder.run(id)
    await this.repository.delete(id)
    meetup.markAsDeleted()
    const events = meetup.pullDomainEvents()
    await this.eventBus.publish(events)
  }
}
