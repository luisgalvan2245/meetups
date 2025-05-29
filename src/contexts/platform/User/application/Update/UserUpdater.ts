import { UserRepository } from '../../../User/domain/persistance/UserRepository'
import { UserFinder } from '../../../User/domain/services/UserFinder'
import { UserEmail } from '../../../User/domain/value-objects/UserEmail'
import { UserName } from '../../../User/domain/value-objects/UserName'
import { UserPassword } from '../../../User/domain/value-objects/UserPassword'
import { EventBus } from '../../../shared/domain/events/EventBus'
import { UserId } from '../../../shared/domain/value-objects/UserId'

type Params = {
  id: UserId
  name?: UserName
  email?: UserEmail
  password?: UserPassword
}

export class UserUpdater {
  private finder: UserFinder

  constructor(
    private repository: UserRepository,
    private eventBus: EventBus
  ) {
    this.finder = new UserFinder(this.repository)
  }

  async run(params: Params): Promise<void> {
    const user = await this.finder.run(params.id)

    if (params.name) {
      user.updateName(params.name)
    }
    if (params.email) {
      user.updateEmail(params.email)
    }
    if (params.password) {
      user.updatePassword(params.password)
    }

    await this.repository.update(user)
    const events = user.pullDomainEvents()
    await this.eventBus.publish(events)
  }
}
