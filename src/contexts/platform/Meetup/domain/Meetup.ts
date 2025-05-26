import { AggregateRoot } from '../../Shared/domain/AggregateRoot'
import { UserId } from '../../Shared/domain/value-objects/UserId'
import { MeetupCreatedDomainEvent } from './events/MeetupCreatedDomainEvent'
import { MeetupDateUpdatedDomainEvent } from './events/MeetupDateUpdatedDomainEvent'
import { MeetupDeletedDomainEvent } from './events/MeetupDeletedDomainEvent'
import { MeetupDescriptionUpdatedDomainEvent } from './events/MeetupDescriptionUpdatedDomainEvent'
import { MeetupImageUrlUpdatedDomainEvent } from './events/MeetupImageUrlUpdatedDomainEvent'
import { MeetupLocationUpdatedDomainEvent } from './events/MeetupLocationUpdatedDomainEvent'
import { MeetupTitleUpdatedDomainEvent } from './events/MeetupTitleUpdatedDomainEvent'
import { MeetupDate } from './value-objects/MeetupDate'
import { MeetupDescription } from './value-objects/MeetupDescription'
import { MeetupId } from './value-objects/MeetupId'
import { MeetupImageUrl } from './value-objects/MeetupImageUrl'
import { MeetupLocation } from './value-objects/MeetupLocation'
import { MeetupTitle } from './value-objects/MeetupTitle'

export class Meetup extends AggregateRoot {
  readonly id: MeetupId
  private _title: MeetupTitle
  private _description: MeetupDescription
  private _date: MeetupDate
  private _location: MeetupLocation
  private _imageUrl: MeetupImageUrl
  private _organizerId: UserId
  private _attendeeIds: Set<UserId>
  private _isDeleted: boolean

  constructor(
    id: MeetupId,
    title: MeetupTitle,
    description: MeetupDescription,
    date: MeetupDate,
    location: MeetupLocation,
    imageUrl: MeetupImageUrl,
    organizerId: UserId
  ) {
    super()
    this.id = id
    this._title = title
    this._description = description
    this._date = date
    this._location = location
    this._imageUrl = imageUrl
    this._organizerId = organizerId
    this._attendeeIds = new Set()
    this._isDeleted = false
  }

  static create(
    id: MeetupId,
    title: MeetupTitle,
    description: MeetupDescription,
    date: MeetupDate,
    location: MeetupLocation,
    imageUrl: MeetupImageUrl,
    organizerId: UserId
  ): Meetup {
    const meetup = new Meetup(
      id,
      title,
      description,
      date,
      location,
      imageUrl,
      organizerId
    )
    const event = new MeetupCreatedDomainEvent({
      aggregateId: meetup.id.value,
      title: meetup.title.value,
      description: meetup.description.value,
      date: meetup.date.toString(),
      location: meetup.location.value,
      imageUrl: meetup.imageUrl.value,
      organizerId: meetup.organizerId.value
    })
    meetup.record(event)
    return meetup
  }

  static fromPrimitives(data: {
    id: string
    title: string
    description: string
    date: string
    location: string
    imageUrl: string
    organizerId: string
    attendeeIds: string[]
    tagIds: string[]
    likeCount: number
    commentCount: number
    isDeleted: boolean
  }): Meetup {
    const meetup = new Meetup(
      new MeetupId(data.id),
      new MeetupTitle(data.title),
      new MeetupDescription(data.description),
      new MeetupDate(new Date(data.date)),
      new MeetupLocation(data.location),
      new MeetupImageUrl(data.imageUrl),
      new UserId(data.organizerId)
    )
    meetup._attendeeIds = new Set(data.attendeeIds.map(id => new UserId(id)))
    meetup._isDeleted = data.isDeleted
    return meetup
  }

  toPrimitives() {
    return {
      id: this.id.value,
      title: this._title.value,
      description: this._description.value,
      date: this._date.toString(),
      location: this._location.value,
      imageUrl: this._imageUrl.value,
      organizerId: this._organizerId.value,
      attendeeIds: Array.from(this._attendeeIds).map(id => id.value),
      isDeleted: this._isDeleted
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

  get organizerId() {
    return this._organizerId
  }

  get attendeeIds() {
    return this._attendeeIds
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

  addAttendee(attendeeId: UserId): void {
    this._attendeeIds.add(attendeeId)
  }

  removeAttendee(attendeeId: UserId): void {
    this._attendeeIds.delete(attendeeId)
  }

  markAsDeleted(): void {
    this._isDeleted = true
    const event = new MeetupDeletedDomainEvent({
      aggregateId: this.id.value
    })
    this.record(event)
  }
}
