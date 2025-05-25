import { UserRepository } from '../../domain/Repositories/UserRepository'
import { User } from '../../domain/User'

export class ListUsers {
  constructor(private repository: UserRepository) {}

  async run(): Promise<User[]> {
    return this.repository.findAll()
  }
}
