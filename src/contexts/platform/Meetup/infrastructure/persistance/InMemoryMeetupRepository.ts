import { inMemoryStore } from '../../../Shared/infrastructure/persistance/InMemoryStore'
import { Meetup } from '../../domain/Meetup'
import { MeetupRepository } from '../../domain/persistance/MeetupRepository'
import { MeetupId } from '../../domain/value-objects/MeetupId'

export class InMemoryMeetupRepository implements MeetupRepository {
  async findAll(): Promise<Meetup[]> {
    return inMemoryStore.meetups
  }

  async findById(id: MeetupId): Promise<Meetup | null> {
    return inMemoryStore.meetups.find(meetup => meetup.id.equals(id)) || null
  }

  async save(meetup: Meetup): Promise<void> {
    const index = inMemoryStore.meetups.findIndex(m => m.id.equals(meetup.id))
    if (index >= 0) {
      inMemoryStore.meetups[index] = meetup
    } else {
      inMemoryStore.meetups.push(meetup)
    }
  }

  async delete(id: MeetupId): Promise<void> {
    inMemoryStore.meetups = inMemoryStore.meetups.filter(
      meetup => !meetup.id.equals(id)
    )
  }
}
