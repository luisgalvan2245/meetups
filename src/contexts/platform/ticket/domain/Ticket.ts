import { AggregateRoot } from '../../shared/domain/AggregateRoot'
import { TicketCreatedDomainEvent } from './events/TicketCreatedDomainEvent'
import { TicketDeletedDomainEvent } from './events/TicketDeletedDomainEvent'
import { TicketDescriptionUpdatedDomainEvent } from './events/TicketDescriptionUpdatedDomainEvent'
import { TicketDescription } from './value-objects/TicketDescription'
import { TicketId } from './value-objects/TicketId'

export class Ticket extends AggregateRoot {
  readonly id: TicketId
  private _description: TicketDescription
  private _isDeleted: boolean

  constructor(id: TicketId, description: TicketDescription) {
    super()
    this.id = id
    this._description = description
    this._isDeleted = false
  }

  static create(id: TicketId, description: TicketDescription): Ticket {
    const ticket = new Ticket(id, description)
    const event = new TicketCreatedDomainEvent({
      aggregateId: ticket.id.value,
      description: ticket.description.value
    })
    ticket.record(event)
    return ticket
  }

  static fromPrimitives(data: {
    id: string
    description: string
    isDeleted: boolean
  }): Ticket {
    const ticket = new Ticket(
      new TicketId(data.id),
      new TicketDescription(data.description)
    )
    ticket._isDeleted = data.isDeleted
    return ticket
  }

  toPrimitives() {
    return {
      id: this.id.value,
      description: this._description.value,
      isDeleted: this._isDeleted
    }
  }

  get description() {
    return this._description
  }

  get isDeleted() {
    return this._isDeleted
  }

  updateDescription(description: TicketDescription): void {
    this._description = description
    const event = new TicketDescriptionUpdatedDomainEvent({
      aggregateId: this.id.value,
      description: description.value
    })
    this.record(event)
  }

  markAsDeleted(): void {
    this._isDeleted = true
    const event = new TicketDeletedDomainEvent({
      aggregateId: this.id.value
    })
    this.record(event)
  }
}
