import { UserId } from '../../../Shared/domain/ValueObjects/UserId'
import { inMemoryStore } from '../../../Shared/infrastructure/InMemoryStore'
import { UserRepository } from '../../domain/Repositories/UserRepository'
import { User } from '../../domain/User'
import { UserEmail } from '../../domain/ValueObjects/UserEmail'
import { UserName } from '../../domain/ValueObjects/UserName'

export class InMemoryUserRepository implements UserRepository {
  private static users: User[] = inMemoryStore.getUsers()

  async findAll(): Promise<User[]> {
    return InMemoryUserRepository.users
  }

  async findById(id: UserId): Promise<User | null> {
    return InMemoryUserRepository.users.find(user => user.id.equals(id)) || null
  }

  async create(user: User): Promise<void> {
    InMemoryUserRepository.users.push(user)
  }

  async update(user: User): Promise<void> {
    const index = InMemoryUserRepository.users.findIndex(u =>
      u.id.equals(user.id)
    )
    if (index >= 0) {
      InMemoryUserRepository.users[index] = user
    }
  }

  async delete(id: UserId): Promise<void> {
    InMemoryUserRepository.users = InMemoryUserRepository.users.filter(
      user => !user.id.equals(id)
    )
  }

  async findByEmail(email: UserEmail): Promise<User | null> {
    return (
      InMemoryUserRepository.users.find(user => user.email.equals(email)) ||
      null
    )
  }

  async findByUsername(username: UserName): Promise<User | null> {
    return (
      InMemoryUserRepository.users.find(user => user.name.equals(username)) ||
      null
    )
  }
}
