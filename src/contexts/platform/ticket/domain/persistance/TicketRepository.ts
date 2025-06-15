import { Ticket } from '../Ticket'
import { TicketId } from '../value-objects/TicketId'

export interface TicketRepository {
  findAll(): Promise<Ticket[]>
  findById(id: TicketId): Promise<Ticket | null>
  save(ticket: Ticket): Promise<void>
  delete(id: TicketId): Promise<void>
}
