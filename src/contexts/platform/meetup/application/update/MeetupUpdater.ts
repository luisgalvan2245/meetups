import { EventBus } from '../../../shared/domain/events/EventBus'
import { UserId } from '../../../shared/domain/value-objects/UserId'
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
  title?: MeetupTitle
  description?: MeetupDescription
  date?: MeetupDate
  location?: MeetupLocation
  imageUrl?: MeetupImageUrl
  attendees?: UserId[]
  organizerId?: UserId
}

export class MeetupUpdater {
  private readonly finder: MeetupFinder

  constructor(
    private readonly repository: MeetupRepository,
    private readonly bus: EventBus
  ) {
    this.finder = new MeetupFinder(repository)
  }

  async run(params: Params): Promise<void> {
    const meetup = await this.finder.run(params.id)

    if (params.title) {
      meetup.updateTitle(params.title)
    }
    if (params.description) {
      meetup.updateDescription(params.description)
    }
    if (params.date) {
      meetup.updateDate(params.date)
    }
    if (params.location) {
      meetup.updateLocation(params.location)
    }
    if (params.imageUrl) {
      meetup.updateImageUrl(params.imageUrl)
    }
    if (params.attendees) {
      const currentAttendees = meetup.attendeeIds
      const newAttendees = new Set(params.attendees)

      currentAttendees.forEach(attendee => {
        if (!newAttendees.has(attendee)) {
          meetup.removeAttendee(attendee)
        }
      })
      newAttendees.forEach(attendee => {
        if (!currentAttendees.has(attendee)) {
          meetup.addAttendee(attendee)
        }
      })
    }

    await this.repository.save(meetup)
    const events = meetup.pullDomainEvents()
    await this.bus.publish(events)
  }
}
