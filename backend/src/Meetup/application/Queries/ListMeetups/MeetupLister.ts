import { Meetup } from "../../../domain/Aggregates/Meetup/Meetup"
import { MeetupRepository } from "../../../domain/Aggregates/Meetup/MeetupRepository"

export class MeetupLister {
  constructor(private repository: MeetupRepository) {}

  async run(): Promise<Meetup[]> {
    return this.repository.findAll()
  }
}
