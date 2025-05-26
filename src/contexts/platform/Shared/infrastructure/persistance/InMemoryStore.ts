import { Meetup } from '../../../Meetup/domain/Meetup'
import { User } from '../../../User/domain/User'

class InMemoryStore {
  users: User[] = []
  meetups: Meetup[] = []
}

export const inMemoryStore = new InMemoryStore()
