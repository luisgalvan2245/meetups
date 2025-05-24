import { inMemoryStore } from '../../../Shared/infrastructure/InMemoryStore'
import { Meetup } from '../../domain/Meetup'
import { MeetupRepository } from '../../domain/Repositories/MeetupRepository'
import { MeetupId } from '../../domain/ValueObjects/MeetupId'

export class InMemoryMeetupRepository implements MeetupRepository {
  private static meetups: Meetup[] = inMemoryStore.getMeetups()

  async findAll(): Promise<Meetup[]> {
    return InMemoryMeetupRepository.meetups
  }

  async findById(id: MeetupId): Promise<Meetup | null> {
    return (
      InMemoryMeetupRepository.meetups.find(meetup => meetup.id.equals(id)) ||
      null
    )
  }

  async create(meetup: Meetup): Promise<void> {
    InMemoryMeetupRepository.meetups.push(meetup)
  }

  async update(meetup: Meetup): Promise<void> {
    const index = InMemoryMeetupRepository.meetups.findIndex(m =>
      m.id.equals(meetup.id)
    )
    if (index >= 0) {
      InMemoryMeetupRepository.meetups[index] = meetup
    }
  }

  async delete(id: MeetupId): Promise<void> {
    InMemoryMeetupRepository.meetups = InMemoryMeetupRepository.meetups.filter(
      meetup => !meetup.id.equals(id)
    )
  }
}
