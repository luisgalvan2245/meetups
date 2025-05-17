import { EntityId } from "@/shared/domain/value-objects/entity-id"
import { MeetupTitle } from "@/meetup/domain/value-objects/meetup-title"
import { MeetupDescription } from "@/meetup/domain/value-objects/meetup-description"
import { MeetupDate } from "@/meetup/domain/value-objects/meetup-date"
import { MeetupLocation } from "@/meetup/domain/value-objects/meetup-location"
import { MeetupImageUrl } from "@/meetup/domain/value-objects/meetup-image-url"
import { MeetupDateTime } from "@/meetup/domain/value-objects/meetup-date-time"

export class Meetup {
  public readonly id: EntityId
  private title: MeetupTitle
  private description: MeetupDescription
  private date: MeetupDate
  private location: MeetupLocation
  private imageUrl: MeetupImageUrl
  private readonly createdAt: MeetupDateTime
  private updatedAt: MeetupDateTime

  private constructor(
    id: EntityId,
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
      EntityId.create(crypto.randomUUID()),
      MeetupTitle.create(title),
      MeetupDescription.create(description),
      MeetupDate.create(typeof date === "string" ? new Date(date) : date),
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
      EntityId.create(data.id),
      MeetupTitle.create(data.title),
      MeetupDescription.create(data.description),
      MeetupDate.create(new Date(data.date)),
      MeetupLocation.create(data.location),
      MeetupImageUrl.create(data.imageUrl),
      MeetupDateTime.create(data.createdAt),
      MeetupDateTime.create(data.updatedAt)
    )
  }

  public toPrimitives() {
    return {
      id: this.id.value,
      title: this.title.value,
      description: this.description.value,
      date: this.date.toISOString(),
      location: this.location.value,
      imageUrl: this.imageUrl.value,
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
      this.date = MeetupDate.create(
        typeof data.date === "string" ? new Date(data.date) : data.date
      )
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
    return this.id.value
  }

  public getTitle(): string {
    return this.title.value
  }

  public getDescription(): string {
    return this.description.value
  }

  public getDate(): Date {
    return this.date.value
  }

  public getLocation(): string {
    return this.location.value
  }

  public getImageUrl(): string {
    return this.imageUrl.value
  }

  public getCreatedAt(): Date {
    return this.createdAt.value
  }

  public getUpdatedAt(): Date {
    return this.updatedAt.value
  }
}
