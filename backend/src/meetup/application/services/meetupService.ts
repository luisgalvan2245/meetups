import { Meetup } from "../../domain/entities/meetupEntity"
import { MeetupRepository } from "../../domain/repositories/meetupRepository"

export class MeetupService {
  constructor(private readonly meetupRepository: MeetupRepository) {}

  async getMeetups(): Promise<Meetup[]> {
    return this.meetupRepository.findAll()
  }

  async getMeetupById(id: string): Promise<Meetup | null> {
    return this.meetupRepository.findById(id)
  }

  async createMeetup(data: {
    title: string
    description: string
    date: string | Date
    location: string
    imageUrl: string
  }): Promise<Meetup> {
    const meetup = Meetup.create(
      data.title,
      data.description,
      data.date,
      data.location,
      data.imageUrl
    )
    return this.meetupRepository.create(meetup)
  }

  async updateMeetup(
    id: string,
    data: {
      title?: string
      description?: string
      date?: string | Date
      location?: string
      imageUrl?: string
    }
  ): Promise<Meetup | null> {
    const meetup = await this.meetupRepository.findById(id)
    if (!meetup) return null

    meetup.update(data)
    return this.meetupRepository.update(id, meetup)
  }

  async deleteMeetup(id: string): Promise<boolean> {
    return this.meetupRepository.delete(id)
  }
}
