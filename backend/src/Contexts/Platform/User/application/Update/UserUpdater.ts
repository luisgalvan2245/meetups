import { EventBus } from '../../../Shared/domain/Bus/EventBus/EventBus'
import { UserId } from '../../../Shared/domain/ValueObjects/UserId'
import { UserRepository } from '../../../User/domain/Persistance/UserRepository'
import { UserFinder } from '../../../User/domain/Services/UserFinder'
import { UserEmail } from '../../../User/domain/ValueObjects/UserEmail'
import { UserName } from '../../../User/domain/ValueObjects/UserName'
import { UserPassword } from '../../../User/domain/ValueObjects/UserPassword'

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
