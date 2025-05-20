import { MeetupRepository } from "../repositories/MeetupRepository"
import { Meetup } from "../entities/Meetup"
import { MeetupNotFound } from "../errors/MeetupNotFound"
import { MeetupId } from "../../../shared/domain/value-objects/MeetupId"
import { InvalidUUIDError } from "../../../shared/domain/errors/InvalidUUIDError"

export class MeetupFinder {
  constructor(private repository: MeetupRepository) {}

  async run(id: string): Promise<Meetup> {
    try {
      const meetupId = new MeetupId(id)
      const meetup = await this.repository.findById(meetupId.value)
      if (!meetup) {
        throw new MeetupNotFound(id)
      }
      return meetup
    } catch (error) {
      if (error instanceof InvalidUUIDError) {
        throw error
      }
      throw new MeetupNotFound(id)
    }
  }
}
