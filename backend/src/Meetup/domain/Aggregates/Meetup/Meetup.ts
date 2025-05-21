import { AggregateRoot } from "../../../../Shared/domain/AggregateRoot"
import { MeetupId } from "../../../domain/Aggregates/Meetup/MeetupId"
import { MeetupTitle } from "../../../domain/ValueObjects/MeetupTitle"
import { MeetupDescription } from "../../../domain/ValueObjects/MeetupDescription"
import { MeetupDate } from "../../../domain/ValueObjects/MeetupDate"
import { MeetupLocation } from "../../../domain/ValueObjects/MeetupLocation"
import { MeetupImageUrl } from "../../../domain/ValueObjects/MeetupImageUrl"
import { MeetupCreatedDomainEvent } from "../../../domain/Events/MeetupCreatedDomainEvent"
import { MeetupTitleUpdatedDomainEvent } from "../../../domain/Events/MeetupTitleUpdatedDomainEvent"
import { MeetupDescriptionUpdatedDomainEvent } from "../../../domain/Events/MeetupDescriptionUpdatedDomainEvent"
import { MeetupDateUpdatedDomainEvent } from "../../../domain/Events/MeetupDateUpdatedDomainEvent"
import { MeetupLocationUpdatedDomainEvent } from "../../../domain/Events/MeetupLocationUpdatedDomainEvent"
import { MeetupImageUrlUpdatedDomainEvent } from "../../../domain/Events/MeetupImageUrlUpdatedDomainEvent"
import { MeetupDeletedDomainEvent } from "../../../domain/Events/MeetupDeletedDomainEvent"

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
    this.record(
      new MeetupTitleUpdatedDomainEvent({
        aggregateId: this.id.value,
        title: title.value
      })
    )
  }

  updateDescription(description: MeetupDescription): void {
    this._description = description
    this.record(
      new MeetupDescriptionUpdatedDomainEvent({
        aggregateId: this.id.value,
        description: description.value
      })
    )
  }

  updateDate(date: MeetupDate): void {
    this._date = date
    this.record(
      new MeetupDateUpdatedDomainEvent({
        aggregateId: this.id.value,
        date: date.toString()
      })
    )
  }

  updateLocation(location: MeetupLocation): void {
    this._location = location
    this.record(
      new MeetupLocationUpdatedDomainEvent({
        aggregateId: this.id.value,
        location: location.value
      })
    )
  }

  updateImageUrl(imageUrl: MeetupImageUrl): void {
    this._imageUrl = imageUrl
    this.record(
      new MeetupImageUrlUpdatedDomainEvent({
        aggregateId: this.id.value,
        imageUrl: imageUrl.value
      })
    )
  }

  markAsDeleted(): void {
    this._isDeleted = true
    this.record(
      new MeetupDeletedDomainEvent({
        aggregateId: this.id.value
      })
    )
  }
}
