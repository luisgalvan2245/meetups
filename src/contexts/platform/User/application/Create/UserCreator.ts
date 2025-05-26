import { EventBus } from '../../../Shared/domain/bus/EventBus/EventBus'
import { UserId } from '../../../Shared/domain/value-objects/UserId'
import { User } from '../../domain/User'
import { UserRepository } from '../../domain/persistance/UserRepository'
import { UserEmail } from '../../domain/value-objects/UserEmail'
import { UserName } from '../../domain/value-objects/UserName'
import { UserPassword } from '../../domain/value-objects/UserPassword'

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
