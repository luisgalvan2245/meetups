import { Meetup } from "../entities/Meetup"

export interface MeetupRepository {
  findAll(): Promise<Meetup[]>
  findById(id: string): Promise<Meetup | null>
  create(meetup: Meetup): Promise<void>
  update(id: string, meetup: Meetup): Promise<void>
  delete(id: string): Promise<void>
}
