import { EventBus } from '../../../Shared/domain/Bus/EventBus/EventBus'
import { UserId } from '../../../Shared/domain/ValueObjects/UserId'
import { TagId } from '../../../Tag/domain/ValueObjects/TagId'
import { MeetupRepository } from '../../domain/Repositories/MeetupRepository'
import { MeetupFinder } from '../../domain/Services/MeetupFinder'
import { MeetupDate } from '../../domain/ValueObjects/MeetupDate'
import { MeetupDescription } from '../../domain/ValueObjects/MeetupDescription'
import { MeetupId } from '../../domain/ValueObjects/MeetupId'
import { MeetupImageUrl } from '../../domain/ValueObjects/MeetupImageUrl'
import { MeetupLocation } from '../../domain/ValueObjects/MeetupLocation'
import { MeetupTitle } from '../../domain/ValueObjects/MeetupTitle'

type Params = {
  id: MeetupId
  title?: MeetupTitle
  description?: MeetupDescription
  date?: MeetupDate
  location?: MeetupLocation
  imageUrl?: MeetupImageUrl
  attendees?: UserId[]
  tags?: TagId[]
  organizerId?: UserId
}

export class MeetupUpdater {
  private finder: MeetupFinder

  constructor(
    private repository: MeetupRepository,
    private eventBus: EventBus
  ) {
    this.finder = new MeetupFinder(this.repository)
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
    if (params.tags) {
      const currentTags = meetup.tagIds
      const newTags = new Set(params.tags)

      currentTags.forEach(tag => {
        if (!newTags.has(tag)) {
          meetup.removeTag(tag)
        }
      })
      newTags.forEach(tag => {
        if (!currentTags.has(tag)) {
          meetup.addTag(tag)
        }
      })
    }

    await this.repository.update(meetup)
    const events = meetup.pullDomainEvents()
    await this.eventBus.publish(events)
  }
}
