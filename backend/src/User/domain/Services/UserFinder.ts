import { UserId } from '../../../Shared/domain/ValueObjects/UserId'
import { UserNotFoundError } from '../Exceptions/UserNotFoundError'
import { UserRepository } from '../Repositories/UserRepository'
import { User } from '../User'

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
