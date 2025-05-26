import { EventBus } from '../../../Shared/domain/Bus/EventBus/EventBus'
import { UserId } from '../../../Shared/domain/ValueObjects/UserId'
import { UserRepository } from '../../domain/Persistance/UserRepository'
import { User } from '../../domain/User'
import { UserEmail } from '../../domain/ValueObjects/UserEmail'
import { UserName } from '../../domain/ValueObjects/UserName'
import { UserPassword } from '../../domain/ValueObjects/UserPassword'

type Params = {
  id: UserId
  name: UserName
  email: UserEmail
  password: UserPassword
}

export class UserCreator {
  constructor(
    private repository: UserRepository,
    private eventBus: EventBus
  ) {}

  async run(params: Params): Promise<void> {
    const user = User.create(
      params.id,
      params.name,
      params.email,
      params.password
    )

    await this.repository.create(user)
    const events = user.pullDomainEvents()
    await this.eventBus.publish(events)
  }
}
