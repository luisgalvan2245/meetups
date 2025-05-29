import { CreateMeetupCommandHandler } from '../../../meetup/application/create/CreateMeetupCommandHandler'
import { MeetupCreator } from '../../../meetup/application/create/MeetupCreator'
import { DeleteMeetupCommandHandler } from '../../../meetup/application/delete/DeleteMeetupCommandHandler'
import { MeetupDeleter } from '../../../meetup/application/delete/MeetupDeleter'
import { GetMeetupQueryHandler } from '../../../meetup/application/get/GetMeetupQueryHandler'
import { MeetupGetter } from '../../../meetup/application/get/MeetupGetter'
import { ListMeetupsQueryHandler } from '../../../meetup/application/list/ListMeetupsQueryHandler'
import { MeetupsLister } from '../../../meetup/application/list/MeetupsLister'
import { MeetupUpdater } from '../../../meetup/application/update/MeetupUpdater'
import { UpdateMeetupCommandHandler } from '../../../meetup/application/update/UpdateMeetupCommandHandler'
import { MeetupRepository } from '../../../meetup/domain/persistance/MeetupRepository'
import { InMemoryMeetupRepository } from '../../../meetup/infrastructure/persistance/InMemoryMeetupRepository'
import { CommandBus } from '../../domain/command/CommandBus'
import { EventBus } from '../../domain/events/EventBus'
import { QueryBus } from '../../domain/query/QueryBus'
import { CommandHandlers } from '../../infrastructure/command/CommandHandlers'
import { InMemoryCommandBus } from '../../infrastructure/command/InMemoryCommandBus'
import { InMemoryQueryBus } from '../../infrastructure/query/InMemoryQueryBus'
import { QueryHandlers } from '../../infrastructure/query/QueryHandlers'

export class MeetupDeps {
  readonly repository: MeetupRepository
  readonly commandBus: CommandBus
  readonly queryBus: QueryBus

  constructor(eventBus: EventBus) {
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
