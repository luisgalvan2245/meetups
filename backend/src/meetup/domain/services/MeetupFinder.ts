import { MeetupRepository } from "../repositories/MeetupRepository"
import { Meetup } from "../entities/Meetup"
import { MeetupNotFound } from "../errors/MeetupNotFound"

export class MeetupFinder {
  constructor(private meetupRepository: MeetupRepository) {}

  async run(meetupId: string): Promise<Meetup> {
    const meetup = await this.meetupRepository.findById(meetupId)

    if (meetup === null) {
      throw new MeetupNotFound(meetupId)
    }

    return meetup
  }
}
