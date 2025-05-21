import { Meetup } from "../../../Domain/Aggregates/Meetup/Meetup"
import { MeetupRepository } from "../../../Domain/Aggregates/Meetup/MeetupRepository"
import { MeetupId } from "../../../Domain/Aggregates/Meetup/MeetupId"
import { MeetupTitle } from "../../../Domain/ValueObjects/MeetupTitle"
import { MeetupDescription } from "../../../Domain/ValueObjects/MeetupDescription"
import { MeetupDate } from "../../../Domain/ValueObjects/MeetupDate"
import { MeetupLocation } from "../../../Domain/ValueObjects/MeetupLocation"
import { MeetupImageUrl } from "../../../Domain/ValueObjects/MeetupImageUrl"
import { EventBus } from "../../../../Shared/Domain/Events/EventBus"

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
