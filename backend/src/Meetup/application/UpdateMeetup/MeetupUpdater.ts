import { MeetupRepository } from "../../domain/MeetupRepository"
import { MeetupTitle } from "../../domain/ValueObjects/MeetupTitle"
import { MeetupDescription } from "../../domain/ValueObjects/MeetupDescription"
import { MeetupDate } from "../../domain/ValueObjects/MeetupDate"
import { MeetupLocation } from "../../domain/ValueObjects/MeetupLocation"
import { MeetupImageUrl } from "../../domain/ValueObjects/MeetupImageUrl"
import { MeetupFinder } from "../../domain/Services/MeetupFinder"
import { EventBus } from "../../../Shared/domain/Events/EventBus"
import { MeetupId } from "../../domain/ValueObjects/MeetupId"

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
