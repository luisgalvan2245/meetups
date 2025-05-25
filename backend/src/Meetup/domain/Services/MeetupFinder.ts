import { MeetupNotFoundError } from '../Exceptions/MeetupNotFoundError'
import { Meetup } from '../Meetup'
import { MeetupRepository } from '../Repositories/MeetupRepository'
import { MeetupId } from '../ValueObjects/MeetupId'

export class MeetupFinder {
  constructor(private repository: MeetupRepository) {}

  async run(id: MeetupId): Promise<Meetup> {
    const meetup = await this.repository.findById(id)
    if (!meetup) {
      throw new MeetupNotFoundError(id.value)
    }
    return meetup
  }
}
