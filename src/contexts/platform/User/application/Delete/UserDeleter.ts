import { EventBus } from '../../../shared/domain/events/EventBus'
import { UserId } from '../../../shared/domain/value-objects/UserId'
import { UserRepository } from '../../domain/persistance/UserRepository'
import { UserFinder } from '../../domain/services/UserFinder'

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
