import { EventBus } from '../../../Shared/domain/Bus/EventBus/EventBus'
import { UserId } from '../../../Shared/domain/ValueObjects/UserId'
import { Meetup } from '../../domain/Meetup'
import { MeetupRepository } from '../../domain/Repositories/MeetupRepository'
import { MeetupDate } from '../../domain/ValueObjects/MeetupDate'
import { MeetupDescription } from '../../domain/ValueObjects/MeetupDescription'
import { MeetupId } from '../../domain/ValueObjects/MeetupId'
import { MeetupImageUrl } from '../../domain/ValueObjects/MeetupImageUrl'
import { MeetupLocation } from '../../domain/ValueObjects/MeetupLocation'
import { MeetupTitle } from '../../domain/ValueObjects/MeetupTitle'

export class MeetupCreator {
  constructor(
    private repository: MeetupRepository,
    private eventBus: EventBus
  ) {}

  async run(params: {
    id: MeetupId
    title: MeetupTitle
    description: MeetupDescription
    date: MeetupDate
    location: MeetupLocation
    imageUrl: MeetupImageUrl
    organizerId: UserId
  }): Promise<void> {
    const meetup = Meetup.create(
      params.id,
      params.title,
      params.description,
      params.date,
      params.location,
      params.imageUrl,
      params.organizerId
    )
    await this.repository.create(meetup)
    const events = meetup.pullDomainEvents()
    await this.eventBus.publish(events)
  }
}
