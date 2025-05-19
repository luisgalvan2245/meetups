import { Meetup } from "@/meetup/domain/entities/Meetup"
import { MeetupRepository } from "@/meetup/domain/repositories/MeetupRepository"
import { v4 as uuidv4 } from "uuid"

const futureDate = new Date()
futureDate.setDate(futureDate.getDate() + 7)

const meetup1 = Meetup.fromPrimitives({
  id: uuidv4(),
  title: "Meetup 1",
  description: "Description 1",
  date: futureDate.toISOString(),
  location: "Location 1",
  imageUrl: "https://example.com/1.jpg"
})

const meetup2 = Meetup.fromPrimitives({
  id: uuidv4(),
  title: "Meetup 2",
  description: "Description 2",
  date: futureDate.toISOString(),
  location: "Location 2",
  imageUrl: "https://example.com/2.jpg"
})

const meetup3 = Meetup.fromPrimitives({
  id: uuidv4(),
  title: "Meetup 3",
  description: "Description 3",
  date: futureDate.toISOString(),
  location: "Location 3",
  imageUrl: "https://example.com/3.jpg"
})

export class InMemoryMeetupRepository implements MeetupRepository {
  private static meetups: Meetup[] = [meetup1, meetup2, meetup3]

  async findAll(): Promise<Meetup[]> {
    return InMemoryMeetupRepository.meetups
  }

  async findById(id: string): Promise<Meetup | null> {
    return (
      InMemoryMeetupRepository.meetups.find(meetup => meetup.id.value === id) ||
      null
    )
  }

  async create(meetup: Meetup): Promise<Meetup> {
    InMemoryMeetupRepository.meetups.push(meetup)
    return meetup
  }

  async update(id: string, meetup: Meetup): Promise<Meetup | null> {
    const index = InMemoryMeetupRepository.meetups.findIndex(
      m => m.id.value === id
    )
    if (index >= 0) {
      InMemoryMeetupRepository.meetups[index] = meetup
      return meetup
    }
    return null
  }

  async delete(id: string): Promise<boolean> {
    const initialLength = InMemoryMeetupRepository.meetups.length
    InMemoryMeetupRepository.meetups = InMemoryMeetupRepository.meetups.filter(
      meetup => meetup.id.value !== id
    )
    return InMemoryMeetupRepository.meetups.length !== initialLength
  }
}
