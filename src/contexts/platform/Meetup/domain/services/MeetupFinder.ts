import { Meetup } from '../Meetup'
import { MeetupNotFoundError } from '../exceptions/MeetupNotFoundError'
import { MeetupRepository } from '../persistance/MeetupRepository'
import { MeetupId } from '../value-objects/MeetupId'

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
