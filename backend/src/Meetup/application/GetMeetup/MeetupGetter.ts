import { MeetupId } from "../../domain/ValueObjects/MeetupId"
import { Meetup } from "../../domain/Meetup"
import { MeetupRepository } from "../../domain/Repositories/MeetupRepository"
import { MeetupFinder } from "../../domain/Services/MeetupFinder"

export class MeetupGetter {
  private finder: MeetupFinder

  constructor(repository: MeetupRepository) {
    this.finder = new MeetupFinder(repository)
  }

  async run(id: MeetupId): Promise<Meetup> {
    return this.finder.run(id)
  }
}
