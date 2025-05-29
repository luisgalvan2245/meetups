import { EventBus } from '../../../Shared/domain/bus/EventBus/EventBus'
import { UserId } from '../../../Shared/domain/value-objects/UserId'
import { Meetup } from '../../domain/Meetup'
import { MeetupAlreadyExists } from '../../domain/exceptions/MeetupAlreadyExists'
import { MeetupRepository } from '../../domain/persistance/MeetupRepository'
import { MeetupFinder } from '../../domain/services/MeetupFinder'
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
  private readonly finder: MeetupFinder

  constructor(
    private readonly repository: MeetupRepository,
    private readonly bus: EventBus
  ) {
    this.finder = new MeetupFinder(repository)
  }

  async run(params: Params): Promise<void> {
    // const meetup = await this.finder.run(params.id)
    // if (meetup) {
    //   throw new MeetupAlreadyExists(params.id.value)
    // }

    const newMeetup = Meetup.create(
      params.id,
      params.title,
      params.description,
      params.date,
      params.location,
      params.imageUrl,
      params.organizerId
    )
    await this.repository.save(newMeetup)
    const events = newMeetup.pullDomainEvents()
    await this.bus.publish(events)
  }
}
