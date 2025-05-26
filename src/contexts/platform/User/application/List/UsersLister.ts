import { User } from '../../domain/User'
import { UserRepository } from '../../domain/persistance/UserRepository'

export class UsersLister {
  constructor(private repository: UserRepository) {}

  async run(): Promise<User[]> {
    return this.repository.findAll()
  }
}
