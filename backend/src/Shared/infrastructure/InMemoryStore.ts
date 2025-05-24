import { Comment } from '../../Comment/domain/Comment'
import { Like } from '../../Like/domain/Like'
import { Meetup } from '../../Meetup/domain/Meetup'
import { Tag } from '../../Tag/domain/Tag'
import { User } from '../../User/domain/User'

class InMemoryStore {
  private users: User[]
  private meetups: Meetup[]
  private comments: Comment[]
  private likes: Like[]
  private tags: Tag[]

  constructor() {
    this.users = []
    this.meetups = []
    this.comments = []
    this.likes = []
    this.tags = []
  }

  getUsers(): User[] {
    return this.users
  }

  getMeetups(): Meetup[] {
    return this.meetups
  }

  getComments(): Comment[] {
    return this.comments
  }

  getLikes(): Like[] {
    return this.likes
  }

  getTags(): Tag[] {
    return this.tags
  }

  reset(): void {
    this.users = []
    this.meetups = []
    this.comments = []
    this.likes = []
    this.tags = []
  }
}

export const inMemoryStore = new InMemoryStore()
