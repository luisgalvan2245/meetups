import { EventBus } from '../../../Shared/domain/Bus/EventBus/EventBus'
import { UserId } from '../../../Shared/domain/value-objects/UserId'
import { Meetup } from '../../domain/Meetup'
import { MeetupRepository } from '../../domain/persistance/MeetupRepository'
import { MeetupDate } from '../../domain/value-objects/MeetupDate'
import { MeetupDescription } from '../../domain/value-objects/MeetupDescription'
import { MeetupId } from '../../domain/value-objects/MeetupId'
import { MeetupImageUrl } from '../../domain/value-objects/MeetupImageUrl'
import { MeetupLocation } from '../../domain/value-objects/MeetupLocation'
import { MeetupTitle } from '../../domain/value-objects/MeetupTitle'

type Params = {
  id: MeetupId
  title: MeetupTitle
  description: MeetupDescription
  date: MeetupDate
  location: MeetupLocation
  imageUrl: MeetupImageUrl
  organizerId: UserId
}

export class MeetupCreator {
  constructor(
    private repository: MeetupRepository,
    private eventBus: EventBus
  ) {}

  async run(params: Params): Promise<void> {
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
