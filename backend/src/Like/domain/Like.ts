import { AggregateRoot } from '../../Shared/domain/AggregateRoot'
import { MeetupId } from '../Meetup/domain/ValueObjects/MeetupId'
import { UserId } from '../User/domain/ValueObjects/UserId'
import { LikeCreatedDomainEvent } from './Events/LikeCreatedDomainEvent'
import { LikeDeletedDomainEvent } from './Events/LikeDeletedDomainEvent'
import { LikeId } from './ValueObjects/LikeId'

export class Like extends AggregateRoot {
  readonly id: LikeId
  private _userId: UserId
  private _meetupId: MeetupId
  private _createdAt: Date
  private _isDeleted: boolean

  constructor(id: LikeId, userId: UserId, meetupId: MeetupId) {
    super()
    this.id = id
    this._userId = userId
    this._meetupId = meetupId
    this._createdAt = new Date()
    this._isDeleted = false
  }

  static create(id: LikeId, userId: UserId, meetupId: MeetupId): Like {
    const like = new Like(id, userId, meetupId)
    const event = new LikeCreatedDomainEvent({
      aggregateId: like.id.value,
      userId: like.userId.value,
      meetupId: like.meetupId.value
    })
    like.record(event)
    return like
  }

  static fromPrimitives(data: {
    id: string
    userId: string
    meetupId: string
    createdAt: string
    isDeleted: boolean
  }): Like {
    const like = new Like(
      new LikeId(data.id),
      new UserId(data.userId),
      new MeetupId(data.meetupId)
    )
    like._createdAt = new Date(data.createdAt)
    like._isDeleted = data.isDeleted
    return like
  }

  toPrimitives() {
    return {
      id: this.id.value,
      userId: this._userId.value,
      meetupId: this._meetupId.value,
      createdAt: this._createdAt.toISOString(),
      isDeleted: this._isDeleted
    }
  }

  get userId() {
    return this._userId
  }

  get meetupId() {
    return this._meetupId
  }

  get createdAt() {
    return this._createdAt
  }

  get isDeleted() {
    return this._isDeleted
  }

  delete(): void {
    this._isDeleted = true
    const event = new LikeDeletedDomainEvent({
      aggregateId: this.id.value
    })
    this.record(event)
  }
}
