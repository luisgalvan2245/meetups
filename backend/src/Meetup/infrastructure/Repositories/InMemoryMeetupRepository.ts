import { MeetupId } from "../../domain/ValueObjects/MeetupId"
import { Meetup } from "../../domain/Meetup"
import { MeetupRepository } from "../../domain/Repositories/MeetupRepository"
import { v4 as uuidV4 } from "uuid"

function createMeetups() {
  const futureDate = new Date()
  futureDate.setDate(futureDate.getDate() + 7)

  const meetup1 = Meetup.fromPrimitives({
    id: uuidV4(),
    title: "Meetup 1",
    description: "Description 1",
    date: futureDate.toISOString(),
    location: "Location 1",
    imageUrl: "https://example.com/1.jpg"
  })

  const meetup2 = Meetup.fromPrimitives({
    id: uuidV4(),
    title: "Meetup 2",
    description: "Description 2",
    date: futureDate.toISOString(),
    location: "Location 2",
    imageUrl: "https://example.com/2.jpg"
  })

  const meetup3 = Meetup.fromPrimitives({
    id: uuidV4(),
    title: "Meetup 3",
    description: "Description 3",
    date: futureDate.toISOString(),
    location: "Location 3",
    imageUrl: "https://example.com/3.jpg"
  })

  return [meetup1, meetup2, meetup3]
}

export class InMemoryMeetupRepository implements MeetupRepository {
  private static meetups: Meetup[] = createMeetups()

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
