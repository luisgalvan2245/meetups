import { MeetupRepository } from "../../domain/Repositories/MeetupRepository"
import { MeetupFinder } from "../../domain/Services/MeetupFinder"
import { EventBus } from "../../../Shared/domain/EventBus/EventBus"
import { MeetupId } from "../../domain/ValueObjects/MeetupId"

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
    const events = meetup.pullDomainEvents()
    await this.eventBus.publish(events)
  }
}
