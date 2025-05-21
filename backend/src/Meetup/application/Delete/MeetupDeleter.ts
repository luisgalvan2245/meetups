import { MeetupRepository } from "../../domain/repositories/MeetupRepository"
import { MeetupFinder } from "../../domain/services/MeetupFinder"
import { EventBus } from "../../../Shared/domain/EventBus"

export class MeetupDeleter {
  private finder: MeetupFinder

  constructor(
    private repository: MeetupRepository,
    private eventBus: EventBus
  ) {
    this.finder = new MeetupFinder(repository)
  }

  async run(id: string): Promise<void> {
    const meetup = await this.finder.run(id)
    meetup.markAsDeleted()

    await this.repository.delete(id)
    await this.eventBus.publish(meetup.pullDomainEvents())
  }
}
