import { Meetup } from "../../../domain/Aggregates/Meetup/Meetup"
import { MeetupRepository } from "../../../domain/Aggregates/Meetup/MeetupRepository"
import { MeetupId } from "../../../domain/Aggregates/Meetup/MeetupId"
import { MeetupTitle } from "../../../domain/ValueObjects/MeetupTitle"
import { MeetupDescription } from "../../../domain/ValueObjects/MeetupDescription"
import { MeetupDate } from "../../../domain/ValueObjects/MeetupDate"
import { MeetupLocation } from "../../../domain/ValueObjects/MeetupLocation"
import { MeetupImageUrl } from "../../../domain/ValueObjects/MeetupImageUrl"
import { EventBus } from "../../../../Shared/domain/Events/EventBus"

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
    await this.eventBus.publish(meetup.pullDomainEvents())
  }
}
