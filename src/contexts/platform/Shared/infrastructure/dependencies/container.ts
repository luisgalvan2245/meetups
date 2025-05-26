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

class Container {
  // Shared Infrastructure
  logger = new WinstonLogger()
  meetupRepository = new InMemoryMeetupRepository()
  eventBus = new InMemoryAsyncEventBus()

  // Application Services
  meetupCreator = new MeetupCreator(this.meetupRepository, this.eventBus)
  meetupUpdater = new MeetupUpdater(this.meetupRepository, this.eventBus)
  meetupDeleter = new MeetupDeleter(this.meetupRepository, this.eventBus)
  meetupGetter = new MeetupGetter(this.meetupRepository)
  meetupsLister = new MeetupsLister(this.meetupRepository)

  // Command Bus
  commandHandlers = new CommandHandlers([
    new CreateMeetupCommandHandler(this.meetupCreator),
    new UpdateMeetupCommandHandler(this.meetupUpdater),
    new DeleteMeetupCommandHandler(this.meetupDeleter)
  ])

  commandBus = new InMemoryCommandBus(this.commandHandlers)

  // Query Bus
  queryHandlers = new QueryHandlers([
    new GetMeetupQueryHandler(this.meetupGetter),
    new ListMeetupsQueryHandler(this.meetupsLister)
  ])

  queryBus = new InMemoryQueryBus(this.queryHandlers)
}

export const container = new Container()
