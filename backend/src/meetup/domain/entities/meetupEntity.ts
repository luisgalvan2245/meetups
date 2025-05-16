import { MeetupId } from "../valueObjects/meetupId"
import { MeetupTitle } from "../valueObjects/meetupTitle"
import { MeetupDescription } from "../valueObjects/meetupDescription"
import { MeetupDate } from "../valueObjects/meetupDate"
import { MeetupLocation } from "../valueObjects/meetupLocation"
import { MeetupImageUrl } from "../valueObjects/meetupImageUrl"
import { MeetupDateTime } from "../valueObjects/meetupDateTime"

export class Meetup {
  private readonly id: MeetupId
  private title: MeetupTitle
  private description: MeetupDescription
  private date: MeetupDate
  private location: MeetupLocation
  private imageUrl: MeetupImageUrl
  private readonly createdAt: MeetupDateTime
  private updatedAt: MeetupDateTime

  private constructor(
    id: MeetupId,
    title: MeetupTitle,
    description: MeetupDescription,
    date: MeetupDate,
    location: MeetupLocation,
    imageUrl: MeetupImageUrl,
    createdAt: MeetupDateTime,
    updatedAt: MeetupDateTime
  ) {
    this.id = id
    this.title = title
    this.description = description
    this.date = date
    this.location = location
    this.imageUrl = imageUrl
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  public static create(
    title: string,
    description: string,
    date: string | Date,
    location: string,
    imageUrl: string
  ): Meetup {
    const now = MeetupDateTime.create()
    return new Meetup(
      MeetupId.create(),
      MeetupTitle.create(title),
      MeetupDescription.create(description),
      MeetupDate.create(date),
      MeetupLocation.create(location),
      MeetupImageUrl.create(imageUrl),
      now,
      now
    )
  }

  public static fromPrimitives(data: {
    id: string
    title: string
    description: string
    date: string
    location: string
    imageUrl: string
    createdAt: string
    updatedAt: string
  }): Meetup {
    return new Meetup(
      MeetupId.create(data.id),
      MeetupTitle.create(data.title),
      MeetupDescription.create(data.description),
      MeetupDate.create(data.date),
      MeetupLocation.create(data.location),
      MeetupImageUrl.create(data.imageUrl),
      MeetupDateTime.create(data.createdAt),
      MeetupDateTime.create(data.updatedAt)
    )
  }

  public toPrimitives() {
    return {
      id: this.id.getValue(),
      title: this.title.getValue(),
      description: this.description.getValue(),
      date: this.date.toISOString(),
      location: this.location.getValue(),
      imageUrl: this.imageUrl.getValue(),
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString()
    }
  }

  public update(data: {
    title?: string
    description?: string
    date?: string | Date
    location?: string
    imageUrl?: string
  }): void {
    if (data.title) {
      this.title = MeetupTitle.create(data.title)
    }
    if (data.description) {
      this.description = MeetupDescription.create(data.description)
    }
    if (data.date) {
      this.date = MeetupDate.create(data.date)
    }
    if (data.location) {
      this.location = MeetupLocation.create(data.location)
    }
    if (data.imageUrl) {
      this.imageUrl = MeetupImageUrl.create(data.imageUrl)
    }
    this.updatedAt = MeetupDateTime.create()
  }

  public getId(): string {
    return this.id.getValue()
  }

  public getTitle(): string {
    return this.title.getValue()
  }

  public getDescription(): string {
    return this.description.getValue()
  }

  public getDate(): Date {
    return this.date.getValue()
  }

  public getLocation(): string {
    return this.location.getValue()
  }

  public getImageUrl(): string {
    return this.imageUrl.getValue()
  }

  public getCreatedAt(): Date {
    return this.createdAt.getValue()
  }

  public getUpdatedAt(): Date {
    return this.updatedAt.getValue()
  }
}
