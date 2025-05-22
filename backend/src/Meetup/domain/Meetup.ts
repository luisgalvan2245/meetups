import { AggregateRoot } from "../../Shared/domain/AggregateRoot"
import { MeetupId } from "./ValueObjects/MeetupId"
import { MeetupTitle } from "./ValueObjects/MeetupTitle"
import { MeetupDescription } from "./ValueObjects/MeetupDescription"
import { MeetupDate } from "./ValueObjects/MeetupDate"
import { MeetupLocation } from "./ValueObjects/MeetupLocation"
import { MeetupImageUrl } from "./ValueObjects/MeetupImageUrl"
import { MeetupCreatedDomainEvent } from "./Events/MeetupCreatedDomainEvent"
import { MeetupTitleUpdatedDomainEvent } from "./Events/MeetupTitleUpdatedDomainEvent"
import { MeetupDescriptionUpdatedDomainEvent } from "./Events/MeetupDescriptionUpdatedDomainEvent"
import { MeetupDateUpdatedDomainEvent } from "./Events/MeetupDateUpdatedDomainEvent"
import { MeetupLocationUpdatedDomainEvent } from "./Events/MeetupLocationUpdatedDomainEvent"
import { MeetupImageUrlUpdatedDomainEvent } from "./Events/MeetupImageUrlUpdatedDomainEvent"
import { MeetupDeletedDomainEvent } from "./Events/MeetupDeletedDomainEvent"

export class Meetup extends AggregateRoot {
  readonly id: MeetupId
  private _title: MeetupTitle
  private _description: MeetupDescription
  private _date: MeetupDate
  private _location: MeetupLocation
  private _imageUrl: MeetupImageUrl

  private _isDeleted = false

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
    this._title = title
    this._description = description
    this._date = date
    this._location = location
    this._imageUrl = imageUrl
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

  static fromPrimitives(data: {
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

  toPrimitives() {
    return {
      id: this.id.value,
      title: this._title.value,
      description: this._description.value,
      date: this._date.toString(),
      location: this._location.value,
      imageUrl: this._imageUrl.value
    }
  }

  get title() {
    return this._title
  }
  get description() {
    return this._description
  }
  get date() {
    return this._date
  }
  get location() {
    return this._location
  }
  get imageUrl() {
    return this._imageUrl
  }
  get isDeleted() {
    return this._isDeleted
  }

  updateTitle(title: MeetupTitle): void {
    this._title = title
    const event = new MeetupTitleUpdatedDomainEvent({
      aggregateId: this.id.value,
      title: title.value
    })
    this.record(event)
  }

  updateDescription(description: MeetupDescription): void {
    this._description = description
    const event = new MeetupDescriptionUpdatedDomainEvent({
      aggregateId: this.id.value,
      description: description.value
    })
    this.record(event)
  }

  updateDate(date: MeetupDate): void {
    this._date = date
    const event = new MeetupDateUpdatedDomainEvent({
      aggregateId: this.id.value,
      date: date.toString()
    })
    this.record(event)
  }

  updateLocation(location: MeetupLocation): void {
    this._location = location
    const event = new MeetupLocationUpdatedDomainEvent({
      aggregateId: this.id.value,
      location: location.value
    })
    this.record(event)
  }

  updateImageUrl(imageUrl: MeetupImageUrl): void {
    this._imageUrl = imageUrl
    const event = new MeetupImageUrlUpdatedDomainEvent({
      aggregateId: this.id.value,
      imageUrl: imageUrl.value
    })
    this.record(event)
  }

  markAsDeleted(): void {
    this._isDeleted = true
    const event = new MeetupDeletedDomainEvent({
      aggregateId: this.id.value
    })
    this.record(event)
  }
}
