import { EventBus } from '../../../shared/domain/events/EventBus'
import { TicketRepository } from '../../domain/persistance/TicketRepository'
import { TicketFinder } from '../../domain/services/TicketFinder'
import { TicketDescription } from '../../domain/value-objects/TicketDescription'
import { TicketId } from '../../domain/value-objects/TicketId'

type Params = {
  id: TicketId
  description?: TicketDescription
}

export class TicketUpdater {
  private readonly finder: TicketFinder

  constructor(
    private readonly repository: TicketRepository,
    private readonly bus: EventBus
  ) {
    this.finder = new TicketFinder(repository)
  }

  async run(params: Params): Promise<void> {
    const ticket = await this.finder.run(params.id)

    if (params.description) {
      ticket.updateDescription(params.description)
    }

    await this.repository.save(ticket)
    const events = ticket.pullDomainEvents()
    await this.bus.publish(events)
  }
}
