import { Meetup } from "@/meetup/domain/entities/meetup-entity"

export interface MeetupRepository {
  findAll(): Promise<Meetup[]>
  findById(id: string): Promise<Meetup | null>
  create(meetup: Meetup): Promise<Meetup>
  update(id: string, meetup: Meetup): Promise<Meetup | null>
  delete(id: string): Promise<boolean>
}
