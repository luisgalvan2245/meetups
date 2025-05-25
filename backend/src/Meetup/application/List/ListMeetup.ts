import { Meetup } from '../../domain/Meetup'
import { MeetupRepository } from '../../domain/Repositories/MeetupRepository'

export class ListMeetup {
  constructor(private repository: MeetupRepository) {}

  async run(): Promise<Meetup[]> {
    return this.repository.findAll()
  }
}
