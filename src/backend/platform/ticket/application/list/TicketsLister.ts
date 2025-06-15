import { Ticket } from '../../domain/Ticket'
import { TicketRepository } from '../../domain/persistance/TicketRepository'

export class TicketsLister {
  constructor(private readonly repository: TicketRepository) {}

  async run(): Promise<Ticket[]> {
    return this.repository.findAll()
  }
}
