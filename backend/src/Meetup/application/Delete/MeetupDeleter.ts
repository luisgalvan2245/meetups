import { MeetupRepository } from "../../domain/repositories/MeetupRepository"
import { MeetupFinder } from "../../domain/services/MeetupFinder"
import { EventBus } from "../../../Shared/domain/EventBus"
import { MeetupId } from "../../../Shared/domain/value-objects/MeetupId"

export class MeetupDeleter {
  private finder: MeetupFinder

  constructor(
    private repository: MeetupRepository,
    private eventBus: EventBus
  ) {
    this.finder = new MeetupFinder(repository)
  }

  async run(id: MeetupId): Promise<void> {
    const meetup = await this.finder.run(id.value)
    meetup.markAsDeleted()

    await this.repository.delete(id.value)
    await this.eventBus.publish(meetup.pullDomainEvents())
  }
}
