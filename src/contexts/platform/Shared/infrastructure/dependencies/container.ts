import { container } from 'tsyringe'

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
import { CommandHandlers } from '../Bus/CommandBus/CommandHandlers'
import { InMemoryCommandBus } from '../Bus/CommandBus/InMemoryCommandBus'
import { InMemoryAsyncEventBus } from '../Bus/EventBus/InMemoryAsyncEventBus'
import { InMemoryQueryBus } from '../Bus/QueryBus/InMemoryQueryBus'
import { QueryHandlers } from '../Bus/QueryBus/QueryHandlers'
import { WinstonLogger } from '../logger/WinstonLogger'

// Shared instances
container.register('MeetupRepository', { useClass: InMemoryMeetupRepository })
container.register('EventBus', { useClass: InMemoryAsyncEventBus })

// Application services
const meetupCreator = new MeetupCreator(
  container.resolve('MeetupRepository'),
  container.resolve('EventBus')
)
const meetupUpdater = new MeetupUpdater(
  container.resolve('MeetupRepository'),
  container.resolve('EventBus')
)
const meetupDeleter = new MeetupDeleter(
  container.resolve('MeetupRepository'),
  container.resolve('EventBus')
)
const meetupGetter = new MeetupGetter(container.resolve('MeetupRepository'))
const meetupsLister = new MeetupsLister(container.resolve('MeetupRepository'))

// Command handlers
container.register(CommandHandlers, {
  useValue: new CommandHandlers([
    new CreateMeetupCommandHandler(meetupCreator),
    new UpdateMeetupCommandHandler(meetupUpdater),
    new DeleteMeetupCommandHandler(meetupDeleter)
  ])
})

container.register('CommandBus', {
  useValue: new InMemoryCommandBus(container.resolve(CommandHandlers))
})

// Query handlers
container.register(QueryHandlers, {
  useValue: new QueryHandlers([
    new GetMeetupQueryHandler(meetupGetter),
    new ListMeetupsQueryHandler(meetupsLister)
  ])
})

container.register('QueryBus', {
  useValue: new InMemoryQueryBus(container.resolve(QueryHandlers))
})

// Logger
container.register('Logger', { useClass: WinstonLogger })

export { container }
