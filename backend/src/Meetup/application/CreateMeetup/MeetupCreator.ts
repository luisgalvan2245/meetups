import { Meetup } from "../../domain/Meetup"
import { MeetupRepository } from "../../domain/Repositories/MeetupRepository"
import { MeetupId } from "../../domain/ValueObjects/MeetupId"
import { MeetupTitle } from "../../domain/ValueObjects/MeetupTitle"
import { MeetupDescription } from "../../domain/ValueObjects/MeetupDescription"
import { MeetupDate } from "../../domain/ValueObjects/MeetupDate"
import { MeetupLocation } from "../../domain/ValueObjects/MeetupLocation"
import { MeetupImageUrl } from "../../domain/ValueObjects/MeetupImageUrl"
import { EventBus } from "../../../Shared/domain/EventBus/EventBus"

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
  }): Promise<void> {
    const meetup = Meetup.create(
      params.id,
      params.title,
      params.description,
      params.date,
      params.location,
      params.imageUrl
    )

    await this.repository.create(meetup)
    const events = meetup.pullDomainEvents()
    await this.eventBus.publish(events)
  }
}
