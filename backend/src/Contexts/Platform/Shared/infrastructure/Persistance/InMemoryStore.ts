import { Comment } from '../../../Comment/domain/Comment'
import { Like } from '../../../Like/domain/Like'
import { Meetup } from '../../../Meetup/domain/Meetup'
import { Tag } from '../../../Tag/domain/Tag'
import { User } from '../../../User/domain/User'

class InMemoryStore {
  users: User[] = []
  meetups: Meetup[] = []
  comments: Comment[] = []
  likes: Like[] = []
  tags: Tag[] = []
}

export const inMemoryStore = new InMemoryStore()
