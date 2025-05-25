import { UserId } from '../../../Shared/domain/ValueObjects/UserId'
import { inMemoryStore } from '../../../Shared/infrastructure/Persistance/InMemoryStore'
import { UserRepository } from '../../domain/Persistance/UserRepository'
import { User } from '../../domain/User'

export class InMemoryUserRepository implements UserRepository {
  async findAll(): Promise<User[]> {
    return inMemoryStore.users
  }

  async findById(id: UserId): Promise<User | null> {
    return inMemoryStore.users.find(user => user.id.equals(id)) || null
  }

  async create(user: User): Promise<void> {
    inMemoryStore.users.push(user)
  }

  async update(user: User): Promise<void> {
    const index = inMemoryStore.users.findIndex(user => user.id.equals(user.id))
    if (index >= 0) {
      inMemoryStore.users[index] = user
    }
  }

  async delete(id: UserId): Promise<void> {
    inMemoryStore.users = inMemoryStore.users.filter(
      user => !user.id.equals(id)
    )
  }
}
