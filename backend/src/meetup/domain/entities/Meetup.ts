import { AggregateRoot } from "@/shared/domain/AggregateRoot"
import { MeetupId } from "@/shared/domain/value-objects/MeetupId"
import { MeetupTitle } from "@/meetup/domain/value-objects/MeetupTitle"
import { MeetupDescription } from "@/meetup/domain/value-objects/MeetupDescription"
import { MeetupDate } from "@/meetup/domain/value-objects/MeetupDate"
import { MeetupLocation } from "@/meetup/domain/value-objects/MeetupLocation"
import { MeetupImageUrl } from "@/meetup/domain/value-objects/MeetupImageUrl"
import { MeetupCreatedDomainEvent } from "@/meetup/domain/events/MeetupCreatedDomainEvent"

export class Meetup extends AggregateRoot {
  readonly id: MeetupId
  readonly title: MeetupTitle
  readonly description: MeetupDescription
  readonly date: MeetupDate
  readonly location: MeetupLocation
  readonly imageUrl: MeetupImageUrl

  constructor(
    id: MeetupId,
    title: MeetupTitle,
    description: MeetupDescription,
    date: MeetupDate,
    location: MeetupLocation,
    imageUrl: MeetupImageUrl
  ) {
    super()
    this.id = id
    this.title = title
    this.description = description
    this.date = date
    this.location = location
    this.imageUrl = imageUrl
  }

  static create(
    id: MeetupId,
    title: MeetupTitle,
    description: MeetupDescription,
    date: MeetupDate,
    location: MeetupLocation,
    imageUrl: MeetupImageUrl
  ): Meetup {
    const meetup = new Meetup(id, title, description, date, location, imageUrl)

    meetup.record(
      new MeetupCreatedDomainEvent({
        aggregateId: meetup.id.value,
        title: meetup.title.value,
        description: meetup.description.value,
        date: meetup.date.toString(),
        location: meetup.location.value,
        imageUrl: meetup.imageUrl.value
      })
    )

    return meetup
  }

  public static fromPrimitives(data: {
    id: string
    title: string
    description: string
    date: string
    location: string
    imageUrl: string
  }): Meetup {
    return new Meetup(
      new MeetupId(data.id),
      new MeetupTitle(data.title),
      new MeetupDescription(data.description),
      new MeetupDate(new Date(data.date)),
      new MeetupLocation(data.location),
      new MeetupImageUrl(data.imageUrl)
    )
  }

  public toPrimitives() {
    return {
      id: this.id.value,
      title: this.title.value,
      description: this.description.value,
      date: this.date.toString(),
      location: this.location.value,
      imageUrl: this.imageUrl.value
    }
  }
}
