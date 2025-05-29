import { Meetup } from '../../domain/Meetup'
import { MeetupRepository } from '../../domain/persistance/MeetupRepository'

export class MeetupsLister {
  constructor(private readonly repository: MeetupRepository) {}

  async run(): Promise<Meetup[]> {
    return this.repository.findAll()
  }
}
