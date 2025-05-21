import { Meetup } from "../../domain/entities/Meetup"
import { MeetupRepository } from "../../domain/repositories/MeetupRepository"

export class MeetupSearcher {
  constructor(private repository: MeetupRepository) {}

  async run(): Promise<Meetup[]> {
    return this.repository.findAll()
  }
}
