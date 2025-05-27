import { Meetup } from '../Meetup'
import { MeetupId } from '../value-objects/MeetupId'

export interface MeetupRepository {
  findAll(): Promise<Meetup[]>
  findById(id: MeetupId): Promise<Meetup | null>
  save(meetup: Meetup): Promise<void>
  delete(id: MeetupId): Promise<void>
}
