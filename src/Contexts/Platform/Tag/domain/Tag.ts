import { AggregateRoot } from '../../Shared/domain/AggregateRoot'
import { TagCreatedDomainEvent } from './Events/TagCreatedDomainEvent'
import { TagDeletedDomainEvent } from './Events/TagDeletedDomainEvent'
import { TagUpdatedDomainEvent } from './Events/TagUpdatedDomainEvent'
import { TagDescription } from './ValueObjects/TagDescription'
import { TagId } from './ValueObjects/TagId'
import { TagName } from './ValueObjects/TagName'

export class Tag extends AggregateRoot {
  readonly id: TagId
  private _name: TagName
  private _description: TagDescription
  private _createdAt: Date
  private _isDeleted: boolean

  constructor(id: TagId, name: TagName, description: TagDescription) {
    super()
    this.id = id
    this._name = name
    this._description = description
    this._createdAt = new Date()
    this._isDeleted = false
  }

  static create(id: TagId, name: TagName, description: TagDescription): Tag {
    const tag = new Tag(id, name, description)
    const event = new TagCreatedDomainEvent({
      aggregateId: tag.id.value,
      name: tag.name.value,
      description: tag.description.value
    })
    tag.record(event)
    return tag
  }

  static fromPrimitives(data: {
    id: string
    name: string
    description: string
    createdAt: string
    isDeleted: boolean
  }): Tag {
    const tag = new Tag(
      new TagId(data.id),
      new TagName(data.name),
      new TagDescription(data.description)
    )
    tag._createdAt = new Date(data.createdAt)
    tag._isDeleted = data.isDeleted
    return tag
  }

  toPrimitives() {
    return {
      id: this.id.value,
      name: this._name.value,
      description: this._description.value,
      createdAt: this._createdAt.toISOString(),
      isDeleted: this._isDeleted
    }
  }

  get name() {
    return this._name
  }

  get description() {
    return this._description
  }

  get createdAt() {
    return this._createdAt
  }

  get isDeleted() {
    return this._isDeleted
  }

  updateName(name: TagName): void {
    this._name = name
    const event = new TagUpdatedDomainEvent({
      aggregateId: this.id.value,
      name: name.value
    })
    this.record(event)
  }

  updateDescription(description: TagDescription): void {
    this._description = description
    const event = new TagUpdatedDomainEvent({
      aggregateId: this.id.value,
      description: description.value
    })
    this.record(event)
  }

  delete(): void {
    this._isDeleted = true
    const event = new TagDeletedDomainEvent({
      aggregateId: this.id.value
    })
    this.record(event)
  }
}
