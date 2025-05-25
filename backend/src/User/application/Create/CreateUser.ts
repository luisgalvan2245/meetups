import { UserId } from 'src/Shared/domain/ValueObjects/UserId'

import { UserRepository } from '../../domain/Repositories/UserRepository'
import { User } from '../../domain/User'
import { UserEmail } from '../../domain/ValueObjects/UserEmail'
import { UserName } from '../../domain/ValueObjects/UserName'
import { UserPassword } from '../../domain/ValueObjects/UserPassword'

export class CreateUser {
  constructor(private repository: UserRepository) {}

  async run(params: {
    name: string
    email: string
    password: string
  }): Promise<void> {
    const user = User.create(
      UserId.generate(),
      new UserName(params.name),
      new UserEmail(params.email),
      new UserPassword(params.password)
    )

    await this.repository.create(user)
  }
}
