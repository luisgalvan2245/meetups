import { Meetup } from "@/meetup/domain/entities/Meetup"
import { MeetupRepository } from "@/meetup/domain/repositories/MeetupRepository"
import { MeetupDescription } from "@/meetup/domain/value-objects/MeetupDescription"
import { MeetupTitle } from "@/meetup/domain/value-objects/MeetupTitle"
import { MeetupDate } from "@/meetup/domain/value-objects/MeetupDate"
import { MeetupLocation } from "@/meetup/domain/value-objects/MeetupLocation"
import { MeetupImageUrl } from "@/meetup/domain/value-objects/MeetupImageUrl"
import { MeetupId } from "@/shared/domain/value-objects/MeetupId"

export class MeetupService {
  constructor(private meetupRepository: MeetupRepository) {}

  async getAllMeetups(): Promise<Meetup[]> {
    return this.meetupRepository.findAll()
  }

  async getMeetupById(id: MeetupId): Promise<Meetup | null> {
    return this.meetupRepository.findById(id.value)
  }

  async createMeetup(meetupData: {
    id: string
    title: string
    description: string
    date: Date
    location: string
    imageUrl: string
  }): Promise<Meetup> {
    const meetup = Meetup.create(
      new MeetupId(meetupData.id),
      new MeetupTitle(meetupData.title),
      new MeetupDescription(meetupData.description),
      new MeetupDate(meetupData.date),
      new MeetupLocation(meetupData.location),
      new MeetupImageUrl(meetupData.imageUrl)
    )
    return this.meetupRepository.create(meetup)
  }

  async updateMeetup(
    id: MeetupId,
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

    const updatedMeetup = Meetup.create(
      new MeetupId(meetup.id.value),
      new MeetupTitle(meetupData.title ?? meetup.title.value),
      new MeetupDescription(meetupData.description ?? meetup.description.value),
      new MeetupDate(meetupData.date ?? meetup.date.value),
      new MeetupLocation(meetupData.location ?? meetup.location.value),
      new MeetupImageUrl(meetupData.imageUrl ?? meetup.imageUrl.value)
    )
    return this.meetupRepository.update(id.value, updatedMeetup)
  }

  async deleteMeetup(id: MeetupId): Promise<boolean> {
    return this.meetupRepository.delete(id.value)
  }
}
