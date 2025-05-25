import { UserNotFoundError } from '../../domain/Errors/UserNotFoundError'
import { UserRepository } from '../../domain/Repositories/UserRepository'
import { User } from '../../domain/User'
import { UserId } from '../../domain/ValueObjects/UserId'

export class GetUser {
  constructor(private repository: UserRepository) {}

  async run(params: { id: string }): Promise<User> {
    const userId = new UserId(params.id)
    const user = await this.repository.findById(userId)

    if (!user) {
      throw new UserNotFoundError(params.id)
    }

    return user
  }
}
