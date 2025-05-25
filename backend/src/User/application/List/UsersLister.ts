import { UserRepository } from '../../domain/Persistance/UserRepository'
import { User } from '../../domain/User'

export class UsersLister {
  constructor(private repository: UserRepository) {}

  async run(): Promise<User[]> {
    return this.repository.findAll()
  }
}
