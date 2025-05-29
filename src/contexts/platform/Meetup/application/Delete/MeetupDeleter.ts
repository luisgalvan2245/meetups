import { EventBus } from '../../../Shared/domain/bus/EventBus/EventBus'
import { MeetupRepository } from '../../domain/persistance/MeetupRepository'
import { MeetupFinder } from '../../domain/services/MeetupFinder'
import { MeetupId } from '../../domain/value-objects/MeetupId'

export class MeetupDeleter {
  private readonly finder: MeetupFinder

  constructor(
    private readonly repository: MeetupRepository,
    private readonly bus: EventBus
  ) {
    this.finder = new MeetupFinder(repository)
  }

  async run(id: MeetupId): Promise<void> {
    const meetup = await this.finder.run(id)
    await this.repository.delete(id)
    const events = meetup.pullDomainEvents()
    await this.bus.publish(events)
  }
}
