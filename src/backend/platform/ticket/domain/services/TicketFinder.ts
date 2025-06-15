import { Ticket } from '../Ticket'
import { TicketNotFoundError } from '../exceptions/TicketNotFoundError'
import { TicketRepository } from '../persistance/TicketRepository'
import { TicketId } from '../value-objects/TicketId'

export class TicketFinder {
  constructor(private repository: TicketRepository) {}

  async run(id: TicketId): Promise<Ticket> {
    const ticket = await this.repository.findById(id)
    if (!ticket) {
      throw new TicketNotFoundError(id.value)
    }
    return ticket
  }
}
