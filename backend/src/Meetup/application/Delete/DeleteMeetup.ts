import { EventBus } from '../../../Shared/domain/Bus/EventBus/EventBus'
import { MeetupRepository } from '../../domain/Repositories/MeetupRepository'
import { FindMeetup } from '../../domain/Services/FindMeetup'
import { MeetupId } from '../../domain/ValueObjects/MeetupId'

export class DeleteMeetup {
  private finder: FindMeetup

  constructor(
    private repository: MeetupRepository,
    private eventBus: EventBus
  ) {
    this.finder = new FindMeetup(repository)
  }

  async run(id: MeetupId): Promise<void> {
    const meetup = await this.finder.run(id)
    await this.repository.delete(id)
    meetup.markAsDeleted()
    const events = meetup.pullDomainEvents()
    await this.eventBus.publish(events)
  }
}
