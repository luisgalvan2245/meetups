import { MeetupRepository } from "../../domain/repositories/MeetupRepository"
import { MeetupTitle } from "../../domain/value-objects/MeetupTitle"
import { MeetupDescription } from "../../domain/value-objects/MeetupDescription"
import { MeetupDate } from "../../domain/value-objects/MeetupDate"
import { MeetupLocation } from "../../domain/value-objects/MeetupLocation"
import { MeetupImageUrl } from "../../domain/value-objects/MeetupImageUrl"
import { MeetupFinder } from "../../domain/services/MeetupFinder"
import { EventBus } from "../../../Shared/domain/EventBus"

export class MeetupUpdater {
  private finder: MeetupFinder

  constructor(
    private repository: MeetupRepository,
    private eventBus: EventBus
  ) {
    this.finder = new MeetupFinder(this.repository)
  }

  async run(
    id: string,
    title?: string,
    description?: string,
    date?: Date,
    location?: string,
    imageUrl?: string
  ): Promise<void> {
    const meetup = await this.finder.run(id)

    if (title) {
      meetup.updateTitle(new MeetupTitle(title))
    }
    if (description) {
      meetup.updateDescription(new MeetupDescription(description))
    }
    if (date) {
      meetup.updateDate(new MeetupDate(new Date(date)))
    }
    if (location) {
      meetup.updateLocation(new MeetupLocation(location))
    }
    if (imageUrl) {
      meetup.updateImageUrl(new MeetupImageUrl(imageUrl))
    }

    await this.repository.update(id, meetup)
    await this.eventBus.publish(meetup.pullDomainEvents())
  }
}
