import { Ticket } from '../../domain/Ticket'
import { TicketRepository } from '../../domain/persistance/TicketRepository'
import { TicketFinder } from '../../domain/services/TicketFinder'
import { TicketId } from '../../domain/value-objects/TicketId'

export class TicketGetter {
  private readonly finder: TicketFinder

  constructor(repository: TicketRepository) {
    this.finder = new TicketFinder(repository)
  }

  async run(id: TicketId): Promise<Ticket> {
    return this.finder.run(id)
  }
}
