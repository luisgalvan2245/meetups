import { Meetup } from "../Meetup"
import { MeetupId } from "../ValueObjects/MeetupId"

export interface MeetupRepository {
  findAll(): Promise<Meetup[]>
  findById(id: MeetupId): Promise<Meetup | null>
  create(meetup: Meetup): Promise<void>
  update(id: MeetupId, meetup: Meetup): Promise<void>
  delete(id: MeetupId): Promise<void>
}
