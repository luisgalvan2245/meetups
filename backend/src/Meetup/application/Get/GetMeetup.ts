import { Meetup } from '../../domain/Meetup'
import { MeetupRepository } from '../../domain/Repositories/MeetupRepository'
import { FindMeetup } from '../../domain/Services/FindMeetup'
import { MeetupId } from '../../domain/ValueObjects/MeetupId'

export class GetMeetup {
  private finder: FindMeetup

  constructor(repository: MeetupRepository) {
    this.finder = new FindMeetup(repository)
  }

  async run(id: MeetupId): Promise<Meetup> {
    return this.finder.run(id)
  }
}
