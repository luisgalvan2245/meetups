import { EventBus } from '../../../Shared/domain/Bus/EventBus/EventBus'
import { UserId } from '../../../Shared/domain/ValueObjects/UserId'
import { UserRepository } from '../../domain/Persistance/UserRepository'
import { UserFinder } from '../../domain/Services/UserFinder'

export class UserDeleter {
  private finder: UserFinder

  constructor(
    private repository: UserRepository,
    private eventBus: EventBus
  ) {
    this.finder = new UserFinder(repository)
  }

  async run(id: UserId): Promise<void> {
    const user = await this.finder.run(id)
    await this.repository.delete(id)
    user.markAsDeleted()
    const events = user.pullDomainEvents()
    await this.eventBus.publish(events)
  }
}
