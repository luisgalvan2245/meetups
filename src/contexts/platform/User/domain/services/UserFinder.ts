import { UserId } from '../../../Shared/domain/value-objects/UserId'
import { User } from '../User'
import { UserNotFoundError } from '../exceptions/UserNotFoundError'
import { UserRepository } from '../persistance/UserRepository'

export class UserFinder {
  constructor(private repository: UserRepository) {}

  async run(id: UserId): Promise<User> {
    const user = await this.repository.findById(id)
    if (!user) {
      throw new UserNotFoundError(id.value)
    }
    return user
  }
}
