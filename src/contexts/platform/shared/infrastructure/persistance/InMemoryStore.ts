import { User } from '../../../User/domain/User'
import { Meetup } from '../../../meetup/domain/Meetup'

class InMemoryStore {
  users: User[] = []
  meetups: Meetup[] = []
}

export const inMemoryStore = new InMemoryStore()
