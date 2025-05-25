import { UserRepository } from '../../domain/Repositories/UserRepository'
import { User } from '../../domain/User'

export class UsersLister {
  constructor(private repository: UserRepository) {}

  async run(): Promise<User[]> {
    return this.repository.findAll()
  }
}
