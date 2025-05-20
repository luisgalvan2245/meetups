import { MeetupRepository } from "../../domain/repositories/MeetupRepository"
import { MeetupId } from "../../../shared/domain/value-objects/MeetupId"
import { MeetupTitle } from "../../domain/value-objects/MeetupTitle"
import { MeetupDescription } from "../../domain/value-objects/MeetupDescription"
import { MeetupDate } from "../../domain/value-objects/MeetupDate"
import { MeetupLocation } from "../../domain/value-objects/MeetupLocation"
import { MeetupImageUrl } from "../../domain/value-objects/MeetupImageUrl"
import { MeetupFinder } from "../../domain/services/MeetupFinder"

export class MeetupUpdater {
  private finder: MeetupFinder

  constructor(private repository: MeetupRepository) {
    this.finder = new MeetupFinder(repository)
  }

  async run(
    id: string,
    data: {
      title?: string
      description?: string
      date?: Date
      location?: string
      imageUrl?: string
    }
  ): Promise<void> {
    const meetup = await this.finder.run(id)

    if (data.title) {
      meetup.updateTitle(new MeetupTitle(data.title))
    }
    if (data.description) {
      meetup.updateDescription(new MeetupDescription(data.description))
    }
    if (data.date) {
      meetup.updateDate(new MeetupDate(new Date(data.date)))
    }
    if (data.location) {
      meetup.updateLocation(new MeetupLocation(data.location))
    }
    if (data.imageUrl) {
      meetup.updateImageUrl(new MeetupImageUrl(data.imageUrl))
    }

    await this.repository.update(id, meetup)
  }
}
