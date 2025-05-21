import { MeetupRepository } from "../../../Domain/Aggregates/Meetup/MeetupRepository"
import { MeetupTitle } from "../../../Domain/ValueObjects/MeetupTitle"
import { MeetupDescription } from "../../../Domain/ValueObjects/MeetupDescription"
import { MeetupDate } from "../../../Domain/ValueObjects/MeetupDate"
import { MeetupLocation } from "../../../Domain/ValueObjects/MeetupLocation"
import { MeetupImageUrl } from "../../../Domain/ValueObjects/MeetupImageUrl"
import { MeetupFinder } from "../../../Domain/Services/MeetupFinder"
import { EventBus } from "../../../../Shared/Domain/Events/EventBus"
import { MeetupId } from "../../../Domain/Aggregates/Meetup/MeetupId"

export class MeetupUpdater {
  private finder: MeetupFinder

  constructor(
    private repository: MeetupRepository,
    private eventBus: EventBus
  ) {
    this.finder = new MeetupFinder(this.repository)
  }

  async run(params: {
    id: MeetupId
    title?: MeetupTitle
    description?: MeetupDescription
    date?: MeetupDate
    location?: MeetupLocation
    imageUrl?: MeetupImageUrl
  }): Promise<void> {
    const meetup = await this.finder.run(params.id.value)

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

    await this.repository.update(params.id.value, meetup)
    await this.eventBus.publish(meetup.pullDomainEvents())
  }
}
