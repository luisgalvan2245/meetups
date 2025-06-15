import { Ticket } from '../../../meetup/domain/Ticket'

class InMemoryStore {
  tickets: Ticket[] = []
}

export const inMemoryStore = new InMemoryStore()
