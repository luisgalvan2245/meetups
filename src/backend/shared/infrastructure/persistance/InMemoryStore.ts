import { Ticket } from '../../../ticket/domain/Ticket'

class InMemoryStore {
  tickets: Ticket[] = []
}

export const inMemoryStore = new InMemoryStore()
