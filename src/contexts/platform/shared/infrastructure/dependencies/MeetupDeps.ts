import { CreateTicketCommandHandler } from '../../../meetup/application/create/CreateTicketCommandHandler'
import { TicketCreator } from '../../../meetup/application/create/TicketCreator'
import { DeleteTicketCommandHandler } from '../../../meetup/application/delete/DeleteTicketCommandHandler'
import { TicketDeleter } from '../../../meetup/application/delete/TicketDeleter'
import { GetTicketQueryHandler } from '../../../meetup/application/get/GetTicketQueryHandler'
import { TicketGetter } from '../../../meetup/application/get/TicketGetter'
import { ListTicketsQueryHandler } from '../../../meetup/application/list/ListTicketsQueryHandler'
import { TicketsLister } from '../../../meetup/application/list/TicketsLister'
import { TicketUpdater } from '../../../meetup/application/update/TicketUpdater'
import { UpdateTicketCommandHandler } from '../../../meetup/application/update/UpdateTicketCommandHandler'
import { TicketRepository } from '../../../meetup/domain/persistance/TicketRepository'
import { InMemoryTicketRepository } from '../../../meetup/infrastructure/persistance/InMemoryTicketRepository'
import { CommandBus } from '../../domain/command/CommandBus'
import { EventBus } from '../../domain/events/EventBus'
import { QueryBus } from '../../domain/query/QueryBus'
import { CommandHandlers } from '../../infrastructure/command/CommandHandlers'
import { InMemoryCommandBus } from '../../infrastructure/command/InMemoryCommandBus'
import { InMemoryQueryBus } from '../../infrastructure/query/InMemoryQueryBus'
import { QueryHandlers } from '../../infrastructure/query/QueryHandlers'

export class MeetupDeps {
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
