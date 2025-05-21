import { Meetup } from "../../../domain/Aggregates/Meetup/Meetup"
import { MeetupRepository } from "../../../domain/Aggregates/Meetup/MeetupRepository"
import { MeetupFinder } from "../../../domain/Services/MeetupFinder"

export class MeetupGetter {
  private finder: MeetupFinder

  constructor(repository: MeetupRepository) {
    this.finder = new MeetupFinder(repository)
  }

  async run(id: string): Promise<Meetup> {
    return this.finder.run(id)
  }
}
