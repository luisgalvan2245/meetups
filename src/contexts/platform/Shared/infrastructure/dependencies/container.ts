import { InMemoryAsyncEventBus } from '../bus/EventBus/InMemoryAsyncEventBus'
import { WinstonLogger } from '../logger/WinstonLogger'
import { MeetupDeps } from './MeetupDeps'

class Container {
  logger = new WinstonLogger()
  eventBus = new InMemoryAsyncEventBus()
  meetup = new MeetupDeps(this.eventBus)
}

export const container = new Container()
