import { MeetupTitle } from "../valueObjects/meetupTitle"
import { MeetupDate } from "../valueObjects/meetupDate"

export class Meetup {
  private readonly id: string
  private title: MeetupTitle
  private description: string
  private date: MeetupDate
  private location: string
  private imageUrl: string
  private readonly createdAt: Date
  private updatedAt: Date

  private constructor(
    id: string,
    title: MeetupTitle,
    description: string,
    date: MeetupDate,
    location: string,
    imageUrl: string,
    createdAt: Date,
    updatedAt: Date
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
    const now = new Date()
    return new Meetup(
      crypto.randomUUID(),
      MeetupTitle.create(title),
      description,
      MeetupDate.create(date),
      location,
      imageUrl,
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
      data.id,
      MeetupTitle.create(data.title),
      data.description,
      MeetupDate.create(data.date),
      data.location,
      data.imageUrl,
      new Date(data.createdAt),
      new Date(data.updatedAt)
    )
  }

  public toPrimitives() {
    return {
      id: this.id,
      title: this.title.getValue(),
      description: this.description,
      date: this.date.toISOString(),
      location: this.location,
      imageUrl: this.imageUrl,
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
      this.description = data.description
    }
    if (data.date) {
      this.date = MeetupDate.create(data.date)
    }
    if (data.location) {
      this.location = data.location
    }
    if (data.imageUrl) {
      this.imageUrl = data.imageUrl
    }
    this.updatedAt = new Date()
  }

  public getId(): string {
    return this.id
  }

  public getTitle(): string {
    return this.title.getValue()
  }

  public getDescription(): string {
    return this.description
  }

  public getDate(): Date {
    return this.date.getValue()
  }

  public getLocation(): string {
    return this.location
  }

  public getImageUrl(): string {
    return this.imageUrl
  }

  public getCreatedAt(): Date {
    return this.createdAt
  }

  public getUpdatedAt(): Date {
    return this.updatedAt
  }
}
