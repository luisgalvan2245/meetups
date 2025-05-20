import { Meetup } from "../../domain/entities/Meetup"
import { MeetupRepository } from "../../domain/repositories/MeetupRepository"
import { MeetupFinder as DomainMeetupFinder } from "../../domain/services/MeetupFinder"

export class MeetupFinder {
  private finder: DomainMeetupFinder

  constructor(repository: MeetupRepository) {
    this.finder = new DomainMeetupFinder(repository)
  }

  async run(id: string): Promise<Meetup> {
    return this.finder.run(id)
  }
}
