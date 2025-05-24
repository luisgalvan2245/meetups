import { InMemoryStore } from '../../../Shared/infrastructure/InMemoryStore'
import { User } from '../../domain/User'
import { UserRepository } from '../../domain/UserRepository'
import { Email } from '../../domain/ValueObjects/Email'
import { UserId } from '../../domain/ValueObjects/UserId'
import { Username } from '../../domain/ValueObjects/Username'

export class InMemoryUserRepository implements UserRepository {
  private store: InMemoryStore

  constructor() {
    this.store = InMemoryStore.getInstance()
  }

  async save(user: User): Promise<void> {
    this.store.getUsers().set(user.id.toString(), user)
  }

  async findById(id: UserId): Promise<User | null> {
    return this.store.getUsers().get(id.toString()) || null
  }

  async findByEmail(email: Email): Promise<User | null> {
    const users = Array.from(this.store.getUsers().values())
    return users.find(user => user.email.equals(email)) || null
  }

  async findByUsername(username: Username): Promise<User | null> {
    const users = Array.from(this.store.getUsers().values())
    return users.find(user => user.username.equals(username)) || null
  }

  async delete(id: UserId): Promise<void> {
    this.store.getUsers().delete(id.toString())
  }
}
