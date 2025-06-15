import { EventBus } from '../../../shared/domain/events/EventBus'
import { Ticket } from '../../domain/Ticket'
import { TicketAlreadyExists } from '../../domain/exceptions/TicketAlreadyExists'
import { TicketRepository } from '../../domain/persistance/TicketRepository'
import { TicketDescription } from '../../domain/value-objects/TicketDescription'
import { TicketId } from '../../domain/value-objects/TicketId'

type Params = {
  id: TicketId
  description: TicketDescription
}

export class TicketCreator {
  constructor(
    private readonly repository: TicketRepository,
    private readonly bus: EventBus
  ) {}

  async run(params: Params): Promise<void> {
    const ticket = await this.repository.findById(params.id)
    if (ticket) {
      throw new TicketAlreadyExists(params.id.value)
    }

    const newTicket = Ticket.create(params.id, params.description)
    await this.repository.save(newTicket)
    const events = newTicket.pullDomainEvents()
    await this.bus.publish(events)
  }
}
