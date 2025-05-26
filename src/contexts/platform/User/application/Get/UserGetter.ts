import { UserId } from '../../../Shared/domain/value-objects/UserId'
import { User } from '../../domain/User'
import { UserRepository } from '../../domain/persistance/UserRepository'
import { UserFinder } from '../../domain/services/UserFinder'

export class UserGetter {
  private finder: UserFinder

  constructor(repository: UserRepository) {
    this.finder = new UserFinder(repository)
  }

  async run(id: UserId): Promise<User> {
    return this.finder.run(id)
  }
}
