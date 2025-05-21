import { MeetupRepository } from "../Repositories/MeetupRepository"
import { Meetup } from "../Meetup"
import { MeetupNotFoundError } from "../Exceptions/MeetupNotFoundError"
import { MeetupId } from "../ValueObjects/MeetupId"

export class MeetupFinder {
  constructor(private repository: MeetupRepository) {}

  async run(id: string): Promise<Meetup> {
    const meetupId = new MeetupId(id)
    const meetup = await this.repository.findById(meetupId.value)
    if (!meetup) {
      throw new MeetupNotFoundError(id)
    }
    return meetup
  }
}
