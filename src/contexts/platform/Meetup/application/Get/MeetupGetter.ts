import { Meetup } from '../../domain/Meetup'
import { MeetupRepository } from '../../domain/persistance/MeetupRepository'
import { MeetupFinder } from '../../domain/services/MeetupFinder'
import { MeetupId } from '../../domain/value-objects/MeetupId'

export class MeetupGetter {
  private readonly finder: MeetupFinder

  constructor(repository: MeetupRepository) {
    this.finder = new MeetupFinder(repository)
  }

  async run(id: MeetupId): Promise<Meetup> {
    return this.finder.run(id)
  }
}
