import { Meetup } from "@/meetup/domain/entities/meetupEntity"
import { MeetupRepository } from "@/meetup/domain/repositories/meetupRepository"

const futureDate = new Date()
futureDate.setDate(futureDate.getDate() + 7) // 7 días en el futuro

const meetup1 = Meetup.fromPrimitives({
  id: "1",
  title: "Meetup 1",
  description: "Description 1",
  date: futureDate.toISOString(),
  location: "Location 1",
  imageUrl: "https://example.com/1.jpg",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
})

const meetup2 = Meetup.fromPrimitives({
  id: "2",
  title: "Meetup 2",
  description: "Description 2",
  date: futureDate.toISOString(),
  location: "Location 2",
  imageUrl: "https://example.com/2.jpg",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
})

const meetup3 = Meetup.fromPrimitives({
  id: "3",
  title: "Meetup 3",
  description: "Description 3",
  date: futureDate.toISOString(),
  location: "Location 3",
  imageUrl: "https://example.com/3.jpg",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
})

export default class MockMeetupRepository implements MeetupRepository {
  private meetups: Meetup[] = [meetup1, meetup2, meetup3]

  async findAll(): Promise<Meetup[]> {
    return this.meetups
  }

  async findById(id: string): Promise<Meetup | null> {
    return this.meetups.find(meetup => meetup.id.value === id) || null
  }

  async create(meetup: Meetup): Promise<Meetup> {
    this.meetups.push(meetup)
    return meetup
  }

  async update(id: string, meetup: Meetup): Promise<Meetup | null> {
    const index = this.meetups.findIndex(m => m.id.value === id)
    if (index >= 0) {
      this.meetups[index] = meetup
      return meetup
    }
    return null
  }

  async delete(id: string): Promise<boolean> {
    const initialLength = this.meetups.length
    this.meetups = this.meetups.filter(meetup => meetup.id.value !== id)
    return this.meetups.length !== initialLength
  }
}
