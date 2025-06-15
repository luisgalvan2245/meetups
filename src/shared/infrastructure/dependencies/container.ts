import { InMemoryEventBus } from '../events/InMemoryEventBus'
import { WinstonLogger } from '../logger/WinstonLogger'
import { TicketDeps } from './TicketDeps'

class Container {
  readonly logger = new WinstonLogger()
  readonly eventBus = new InMemoryEventBus()
  readonly ticket = new TicketDeps(this.eventBus)
}

export const container = new Container()
