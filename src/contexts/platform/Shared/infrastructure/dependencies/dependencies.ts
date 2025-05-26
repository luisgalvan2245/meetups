// infrastructure/dependencies.ts
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
import { InMemoryQueryBus } from '../../../Shared/infrastructure/Bus/QueryBus/InMemoryQueryBus'
import { QueryHandlers } from '../../../Shared/infrastructure/Bus/QueryBus/QueryHandlers'
import { CommandHandlers } from '../Bus/CommandBus/CommandHandlers'
import { InMemoryCommandBus } from '../Bus/CommandBus/InMemoryCommandBus'
import { InMemoryAsyncEventBus } from '../Bus/EventBus/InMemoryAsyncEventBus'

function createMeetupCommandBus() {
  const meetupRepository = new InMemoryMeetupRepository()
  const eventBus = new InMemoryAsyncEventBus()
  const updater = new MeetupUpdater(meetupRepository, eventBus)
  const deleter = new MeetupDeleter(meetupRepository, eventBus)
  const creator = new MeetupCreator(meetupRepository, eventBus)
  const createCommandHandler = new CreateMeetupCommandHandler(creator)
  const updateCommandHandler = new UpdateMeetupCommandHandler(updater)
  const deleteCommandHandler = new DeleteMeetupCommandHandler(deleter)
  const commandHandlers = new CommandHandlers([
    createCommandHandler,
    updateCommandHandler,
    deleteCommandHandler
  ])
  const commandBus = new InMemoryCommandBus(commandHandlers)
  return commandBus
}

function createMeetupQueryBus() {
  const meetupRepository = new InMemoryMeetupRepository()
  const lister = new MeetupsLister(meetupRepository)
  const getter = new MeetupGetter(meetupRepository)
  const queryHandlers = new QueryHandlers([
    new ListMeetupsQueryHandler(lister),
    new GetMeetupQueryHandler(getter)
  ])
  const queryBus = new InMemoryQueryBus(queryHandlers)
  return queryBus
}

const commandBus = createMeetupCommandBus()
const queryBus = createMeetupQueryBus()

export { commandBus, queryBus }
