import { InMemoryEventBus } from '../bus/EventBus/InMemoryEventBus'
import { WinstonLogger } from '../logger/WinstonLogger'
import { MeetupDeps } from './MeetupDeps'

class Container {
  readonly logger = new WinstonLogger()
  readonly eventBus = new InMemoryEventBus()
  readonly meetup = new MeetupDeps(this.eventBus)
}

export const container = new Container()
