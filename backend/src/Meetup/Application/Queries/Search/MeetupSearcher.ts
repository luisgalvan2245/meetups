import { Meetup } from "../../../Domain/Aggregates/Meetup/Meetup"
import { MeetupRepository } from "../../../Domain/Aggregates/Meetup/MeetupRepository"

export class MeetupSearcher {
  constructor(private repository: MeetupRepository) {}

  async run(): Promise<Meetup[]> {
    return this.repository.findAll()
  }
}
