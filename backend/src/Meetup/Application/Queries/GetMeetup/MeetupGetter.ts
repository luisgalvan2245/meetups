import { Meetup } from "../../../Domain/Aggregates/Meetup/Meetup"
import { MeetupRepository } from "../../../Domain/Aggregates/Meetup/MeetupRepository"
import { MeetupFinder } from "../../../Domain/Services/MeetupFinder"

export class MeetupGetter {
  private finder: MeetupFinder

  constructor(repository: MeetupRepository) {
    this.finder = new MeetupFinder(repository)
  }

  async run(id: string): Promise<Meetup> {
    return this.finder.run(id)
  }
}
