import { Meetup } from "../../domain/entities/meetupEntity"
import { MeetupRepository } from "../../domain/repositories/meetupRepository"

export class MockMeetupRepository implements MeetupRepository {
  private meetups: Meetup[] = [
    Meetup.fromPrimitives({
      id: "1",
      title: "Conferencia de Tecnología",
      description: "Una conferencia sobre las últimas tendencias en tecnología",
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 días en el futuro
      location: "Centro de Convenciones",
      imageUrl: "https://example.com/conf.jpg",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }),
    Meetup.fromPrimitives({
      id: "2",
      title: "Workshop de Programación",
      description: "Aprende las mejores prácticas de programación",
      date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 días en el futuro
      location: "Universidad",
      imageUrl: "https://example.com/workshop.jpg",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })
  ]

  async findAll(): Promise<Meetup[]> {
    return this.meetups
  }

  async findById(id: string): Promise<Meetup | null> {
    return this.meetups.find(meetup => meetup.getId() === id) || null
  }

  async create(meetup: Meetup): Promise<Meetup> {
    this.meetups.push(meetup)
    return meetup
  }

  async update(id: string, meetup: Meetup): Promise<Meetup | null> {
    const index = this.meetups.findIndex(m => m.getId() === id)
    if (index === -1) return null
    this.meetups[index] = meetup
    return meetup
  }

  async delete(id: string): Promise<boolean> {
    const index = this.meetups.findIndex(m => m.getId() === id)
    if (index === -1) return false
    this.meetups.splice(index, 1)
    return true
  }
}
