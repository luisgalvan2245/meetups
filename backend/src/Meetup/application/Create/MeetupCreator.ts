import { Meetup } from "../../domain/entities/Meetup"
import { MeetupRepository } from "../../domain/repositories/MeetupRepository"
import { MeetupId } from "../../../Shared/domain/value-objects/MeetupId"
import { MeetupTitle } from "../../domain/value-objects/MeetupTitle"
import { MeetupDescription } from "../../domain/value-objects/MeetupDescription"
import { MeetupDate } from "../../domain/value-objects/MeetupDate"
import { MeetupLocation } from "../../domain/value-objects/MeetupLocation"
import { MeetupImageUrl } from "../../domain/value-objects/MeetupImageUrl"
import { EventBus } from "../../../Shared/domain/EventBus"

export class MeetupCreator {
  constructor(
    private repository: MeetupRepository,
    private eventBus: EventBus
  ) {}

  async run(params: {
    id: string
    title: string
    description: string
    date: Date
    location: string
    imageUrl: string
  }): Promise<void> {
    const meetup = Meetup.create(
      new MeetupId(params.id),
      new MeetupTitle(params.title),
      new MeetupDescription(params.description),
      new MeetupDate(new Date(params.date)),
      new MeetupLocation(params.location),
      new MeetupImageUrl(params.imageUrl)
    )

    await this.repository.create(meetup)
    await this.eventBus.publish(meetup.pullDomainEvents())
  }
}
