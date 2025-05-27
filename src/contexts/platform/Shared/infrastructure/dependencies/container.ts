import { CreateMeetupCommandHandler } from '../../../Meetup/application/Create/CreateMeetupCommandHandler'
import { MeetupCreator } from '../../../Meetup/application/Create/MeetupCreator'
import { DeleteMeetupCommandHandler } from '../../../Meetup/application/Delete/DeleteMeetupCommandHandler'
import { MeetupDeleter } from '../../../Meetup/application/Delete/MeetupDeleter'
import { GetMeetupQueryHandler } from '../../../Meetup/application/Get/GetMeetupQueryHandler'
import { MeetupGetter } from '../../../Meetup/application/Get/MeetupGetter'
import { ListMeetupsQueryHandler } from '../../../Meetup/application/List/ListMeetupsQueryHandler'
import { MeetupsLister } from '../../../Meetup/application/List/MeetupsLister'
import { MeetupUpdater } from '../../../Meetup/application/Update/MeetupUpdater'
import { UpdateMeetupCommandHandler } from '../../../Meetup/application/Update/UpdateMeetupCommandHandler'
import { InMemoryMeetupRepository } from '../../../Meetup/infrastructure/persistance/InMemoryMeetupRepository'
import { CommandHandlers } from '../bus/CommandBus/CommandHandlers'
import { InMemoryCommandBus } from '../bus/CommandBus/InMemoryCommandBus'
import { InMemoryAsyncEventBus } from '../bus/EventBus/InMemoryAsyncEventBus'
import { InMemoryQueryBus } from '../bus/QueryBus/InMemoryQueryBus'
import { QueryHandlers } from '../bus/QueryBus/QueryHandlers'
import { WinstonLogger } from '../logger/WinstonLogger'

class MeetupContext {
  readonly repository: InMemoryMeetupRepository
  readonly commandBus: InMemoryCommandBus
  readonly queryBus: InMemoryQueryBus

  constructor(eventBus: InMemoryAsyncEventBus) {
    this.repository = new InMemoryMeetupRepository()

    const creator = new MeetupCreator(this.repository, eventBus)
    const updater = new MeetupUpdater(this.repository, eventBus)
    const deleter = new MeetupDeleter(this.repository, eventBus)
    const getter = new MeetupGetter(this.repository)
    const lister = new MeetupsLister(this.repository)

    const commandHandlers = new CommandHandlers([
      new CreateMeetupCommandHandler(creator),
      new UpdateMeetupCommandHandler(updater),
      new DeleteMeetupCommandHandler(deleter)
    ])

    const queryHandlers = new QueryHandlers([
      new GetMeetupQueryHandler(getter),
      new ListMeetupsQueryHandler(lister)
    ])

    this.commandBus = new InMemoryCommandBus(commandHandlers)
    this.queryBus = new InMemoryQueryBus(queryHandlers)
  }
}

class Container {
  logger = new WinstonLogger()
  eventBus = new InMemoryAsyncEventBus()
  meetup = new MeetupContext(this.eventBus)
}

export const container = new Container()
