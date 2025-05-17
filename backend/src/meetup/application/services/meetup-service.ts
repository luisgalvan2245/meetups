import { Meetup } from "@/meetup/domain/entities/meetup-entity"
import { MeetupRepository } from "@/meetup/domain/repositories/meetup-repository"
import { EntityId } from "@/shared/domain/value-objects/entity-id"

export class MeetupService {
  constructor(private meetupRepository: MeetupRepository) {}

  async getAllMeetups(): Promise<Meetup[]> {
    return this.meetupRepository.findAll()
  }

  async getMeetupById(id: EntityId): Promise<Meetup | null> {
    return this.meetupRepository.findById(id.value)
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
    const meetup = await this.meetupRepository.findById(id.value)
    if (!meetup) return null

    meetup.update(meetupData)
    return this.meetupRepository.update(id.value, meetup)
  }

  async deleteMeetup(id: EntityId): Promise<boolean> {
    return this.meetupRepository.delete(id.value)
  }
}
