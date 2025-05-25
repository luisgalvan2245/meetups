import { inMemoryStore } from '../../../Shared/infrastructure/InMemoryStore'
import { Meetup } from '../../domain/Meetup'
import { MeetupRepository } from '../../domain/Repositories/MeetupRepository'
import { MeetupId } from '../../domain/ValueObjects/MeetupId'

export class InMemoryMeetupRepository implements MeetupRepository {
  async findAll(): Promise<Meetup[]> {
    return inMemoryStore.meetups
  }

  async findById(id: MeetupId): Promise<Meetup | null> {
    return inMemoryStore.meetups.find(meetup => meetup.id.equals(id)) || null
  }

  async create(meetup: Meetup): Promise<void> {
    inMemoryStore.meetups.push(meetup)
  }

  async update(meetup: Meetup): Promise<void> {
    const index = inMemoryStore.meetups.findIndex(m => m.id.equals(meetup.id))
    if (index >= 0) {
      inMemoryStore.meetups[index] = meetup
    }
  }

  async delete(id: MeetupId): Promise<void> {
    inMemoryStore.meetups = inMemoryStore.meetups.filter(
      meetup => !meetup.id.equals(id)
    )
  }
}
