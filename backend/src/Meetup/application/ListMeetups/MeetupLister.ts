import { Meetup } from "../../domain/Meetup"
import { MeetupRepository } from "../../domain/MeetupRepository"

export class MeetupLister {
  constructor(private repository: MeetupRepository) {}

  async run(): Promise<Meetup[]> {
    return this.repository.findAll()
  }
}
