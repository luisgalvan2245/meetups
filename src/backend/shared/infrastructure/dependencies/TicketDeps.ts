import { CreateTicketCommandHandler } from '../../../ticket/application/create/CreateTicketCommandHandler'
import { TicketCreator } from '../../../ticket/application/create/TicketCreator'
import { DeleteTicketCommandHandler } from '../../../ticket/application/delete/DeleteTicketCommandHandler'
import { TicketDeleter } from '../../../ticket/application/delete/TicketDeleter'
import { GetTicketQueryHandler } from '../../../ticket/application/get/GetTicketQueryHandler'
import { TicketGetter } from '../../../ticket/application/get/TicketGetter'
import { ListTicketsQueryHandler } from '../../../ticket/application/list/ListTicketsQueryHandler'
import { TicketsLister } from '../../../ticket/application/list/TicketsLister'
import { TicketUpdater } from '../../../ticket/application/update/TicketUpdater'
import { UpdateTicketCommandHandler } from '../../../ticket/application/update/UpdateTicketCommandHandler'
import { TicketRepository } from '../../../ticket/domain/persistance/TicketRepository'
import { InMemoryTicketRepository } from '../../../ticket/infrastructure/persistance/InMemoryTicketRepository'
import { CommandBus } from '../../domain/command/CommandBus'
import { EventBus } from '../../domain/events/EventBus'
import { QueryBus } from '../../domain/query/QueryBus'
import { CommandHandlers } from '../command/CommandHandlers'
import { InMemoryCommandBus } from '../command/InMemoryCommandBus'
import { InMemoryQueryBus } from '../query/InMemoryQueryBus'
import { QueryHandlers } from '../query/QueryHandlers'

export class TicketDeps {
  readonly repository: TicketRepository
  readonly commandBus: CommandBus
  readonly queryBus: QueryBus

  constructor(eventBus: EventBus) {
    this.repository = new InMemoryTicketRepository()

    const creator = new TicketCreator(this.repository, eventBus)
    const updater = new TicketUpdater(this.repository, eventBus)
    const deleter = new TicketDeleter(this.repository, eventBus)
    const getter = new TicketGetter(this.repository)
    const lister = new TicketsLister(this.repository)

    const commandHandlers = new CommandHandlers([
      new CreateTicketCommandHandler(creator),
      new UpdateTicketCommandHandler(updater),
      new DeleteTicketCommandHandler(deleter)
    ])

    const queryHandlers = new QueryHandlers([
      new GetTicketQueryHandler(getter),
      new ListTicketsQueryHandler(lister)
    ])

    this.commandBus = new InMemoryCommandBus(commandHandlers)
    this.queryBus = new InMemoryQueryBus(queryHandlers)
  }
}
