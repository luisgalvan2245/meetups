import { inMemoryStore } from '../../../shared/infrastructure/persistance/InMemoryStore'
import { Ticket } from '../../domain/Ticket'
import { TicketRepository } from '../../domain/persistance/TicketRepository'
import { TicketId } from '../../domain/value-objects/TicketId'

export class InMemoryTicketRepository implements TicketRepository {
  async findAll(): Promise<Ticket[]> {
    return inMemoryStore.tickets.filter(ticket => !ticket.isDeleted)
  }

  async findById(id: TicketId): Promise<Ticket | null> {
    const ticket =
      inMemoryStore.tickets.find(ticket => ticket.id.value === id.value) || null
    return ticket && !ticket.isDeleted ? ticket : null
  }

  async save(ticket: Ticket): Promise<void> {
    const index = inMemoryStore.tickets.findIndex(
      t => t.id.value === ticket.id.value
    )
    if (index >= 0) {
      inMemoryStore.tickets[index] = ticket
    } else {
      inMemoryStore.tickets.push(ticket)
    }
  }

  async delete(id: TicketId): Promise<void> {
    inMemoryStore.tickets = inMemoryStore.tickets.filter(
      ticket => ticket.id.value !== id.value
    )
  }
}
