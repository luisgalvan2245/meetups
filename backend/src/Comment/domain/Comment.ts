import { AggregateRoot } from '../../Shared/domain/AggregateRoot'
import { MeetupId } from '../Meetup/domain/ValueObjects/MeetupId'
import { UserId } from '../User/domain/ValueObjects/UserId'
import { CommentCreatedDomainEvent } from './Events/CommentCreatedDomainEvent'
import { CommentDeletedDomainEvent } from './Events/CommentDeletedDomainEvent'
import { CommentUpdatedDomainEvent } from './Events/CommentUpdatedDomainEvent'
import { CommentContent } from './ValueObjects/CommentContent'
import { CommentId } from './ValueObjects/CommentId'

export class Comment extends AggregateRoot {
  readonly id: CommentId
  private _content: CommentContent
  private _authorId: UserId
  private _meetupId: MeetupId
  private _createdAt: Date
  private _updatedAt: Date
  private _isDeleted: boolean

  constructor(
    id: CommentId,
    content: CommentContent,
    authorId: UserId,
    meetupId: MeetupId
  ) {
    super()
    this.id = id
    this._content = content
    this._authorId = authorId
    this._meetupId = meetupId
    this._createdAt = new Date()
    this._updatedAt = new Date()
    this._isDeleted = false
  }

  static create(
    id: CommentId,
    content: CommentContent,
    authorId: UserId,
    meetupId: MeetupId
  ): Comment {
    const comment = new Comment(id, content, authorId, meetupId)
    const event = new CommentCreatedDomainEvent({
      aggregateId: comment.id.value,
      content: comment.content.value,
      authorId: comment.authorId.value,
      meetupId: comment.meetupId.value
    })
    comment.record(event)
    return comment
  }

  static fromPrimitives(data: {
    id: string
    content: string
    authorId: string
    meetupId: string
    createdAt: string
    updatedAt: string
    isDeleted: boolean
  }): Comment {
    const comment = new Comment(
      new CommentId(data.id),
      new CommentContent(data.content),
      new UserId(data.authorId),
      new MeetupId(data.meetupId)
    )
    comment._createdAt = new Date(data.createdAt)
    comment._updatedAt = new Date(data.updatedAt)
    comment._isDeleted = data.isDeleted
    return comment
  }

  toPrimitives() {
    return {
      id: this.id.value,
      content: this._content.value,
      authorId: this._authorId.value,
      meetupId: this._meetupId.value,
      createdAt: this._createdAt.toISOString(),
      updatedAt: this._updatedAt.toISOString(),
      isDeleted: this._isDeleted
    }
  }

  get content() {
    return this._content
  }

  get authorId() {
    return this._authorId
  }

  get meetupId() {
    return this._meetupId
  }

  get createdAt() {
    return this._createdAt
  }

  get updatedAt() {
    return this._updatedAt
  }

  get isDeleted() {
    return this._isDeleted
  }

  updateContent(content: CommentContent): void {
    this._content = content
    this._updatedAt = new Date()
    const event = new CommentUpdatedDomainEvent({
      aggregateId: this.id.value,
      content: content.value
    })
    this.record(event)
  }

  delete(): void {
    this._isDeleted = true
    this._updatedAt = new Date()
    const event = new CommentDeletedDomainEvent({
      aggregateId: this.id.value
    })
    this.record(event)
  }
}
