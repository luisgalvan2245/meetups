import { Meetup } from '../../domain/Meetup'
import { MeetupRepository } from '../../domain/Persistance/MeetupRepository'

export class MeetupsLister {
  constructor(private repository: MeetupRepository) {}

  async run(): Promise<Meetup[]> {
    return this.repository.findAll()
  }
}
