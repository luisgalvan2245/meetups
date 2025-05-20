import { MeetupRepository } from "../repositories/MeetupRepository"
import { Meetup } from "../entities/Meetup"
import { MeetupNotFound } from "../errors/MeetupNotFound"
import { MeetupId } from "../../../Shared/domain/value-objects/MeetupId"

export class MeetupFinder {
  constructor(private repository: MeetupRepository) {}

  async run(id: string): Promise<Meetup> {
    const meetupId = new MeetupId(id)
    const meetup = await this.repository.findById(meetupId.value)
    if (!meetup) {
      throw new MeetupNotFound(id)
    }
    return meetup
  }
}
