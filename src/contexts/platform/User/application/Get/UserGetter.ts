import { UserId } from '../../../Shared/domain/ValueObjects/UserId'
import { UserRepository } from '../../domain/Persistance/UserRepository'
import { UserFinder } from '../../domain/Services/UserFinder'
import { User } from '../../domain/User'

export class UserGetter {
  private finder: UserFinder

  constructor(repository: UserRepository) {
    this.finder = new UserFinder(repository)
  }

  async run(id: UserId): Promise<User> {
    return this.finder.run(id)
  }
}
