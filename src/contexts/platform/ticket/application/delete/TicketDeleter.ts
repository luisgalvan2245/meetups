import { EventBus } from '../../../shared/domain/events/EventBus'
import { TicketRepository } from '../../domain/persistance/TicketRepository'
import { TicketFinder } from '../../domain/services/TicketFinder'
import { TicketId } from '../../domain/value-objects/TicketId'

export class TicketDeleter {
  private readonly finder: TicketFinder

  constructor(
    private readonly repository: TicketRepository,
    private readonly bus: EventBus
  ) {
    this.finder = new TicketFinder(repository)
  }

  async run(id: TicketId): Promise<void> {
    const ticket = await this.finder.run(id)
    ticket.markAsDeleted()
    await this.repository.save(ticket)
    const events = ticket.pullDomainEvents()
    await this.bus.publish(events)
  }
}
