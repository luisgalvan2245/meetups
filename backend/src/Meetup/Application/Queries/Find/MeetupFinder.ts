import { Meetup } from "../../../Domain/Aggregates/Meetup/Meetup"
import { MeetupRepository } from "../../../Domain/Aggregates/Meetup/MeetupRepository"
import { MeetupFinder as DomainMeetupFinder } from "../../../Domain/Services/MeetupFinder"

export class MeetupFinder {
  private finder: DomainMeetupFinder

  constructor(repository: MeetupRepository) {
    this.finder = new DomainMeetupFinder(repository)
  }

  async run(id: string): Promise<Meetup> {
    return this.finder.run(id)
  }
}
