import { Meetup } from "@/meetup/domain/entities/Meetup"
import { IMeetupRepository } from "@/meetup/domain/repositories/IMeetupRepository"
import { EntityId } from "@/shared/domain/value-objects/EntityId"

export class MeetupService {
  constructor(private meetupRepository: IMeetupRepository) {}

  async getAllMeetups(): Promise<Meetup[]> {
    return this.meetupRepository.findAll()
  }

  async getMeetupById(id: EntityId): Promise<Meetup | null> {
    return this.meetupRepository.findById(id.getValue())
  }

  async createMeetup(meetupData: {
    title: string
    description: string
    date: Date
    location: string
    imageUrl: string
  }): Promise<Meetup> {
    const meetup = Meetup.create(
      meetupData.title,
      meetupData.description,
      meetupData.date,
      meetupData.location,
      meetupData.imageUrl
    )
    return this.meetupRepository.create(meetup)
  }

  async updateMeetup(
    id: EntityId,
    meetupData: {
      title?: string
      description?: string
      date?: Date
      location?: string
      imageUrl?: string
    }
  ): Promise<Meetup | null> {
    const meetup = await this.meetupRepository.findById(id.getValue())
    if (!meetup) return null

    meetup.update(meetupData)
    return this.meetupRepository.update(id.getValue(), meetup)
  }

  async deleteMeetup(id: EntityId): Promise<void> {
    await this.meetupRepository.delete(id.getValue())
  }
}
