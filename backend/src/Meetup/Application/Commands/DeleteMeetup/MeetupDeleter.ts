import { MeetupRepository } from "../../../Domain/Aggregates/Meetup/MeetupRepository"
import { MeetupFinder } from "../../../Domain/Services/MeetupFinder"
import { EventBus } from "../../../../Shared/Domain/Events/EventBus"
import { MeetupId } from "../../../Domain/Aggregates/Meetup/MeetupId"

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
