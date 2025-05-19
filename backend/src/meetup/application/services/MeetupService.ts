import { Meetup } from "@/meetup/domain/entities/Meetup"
import { MeetupRepository } from "@/meetup/domain/repositories/MeetupRepository"
import { MeetupDescription } from "@/meetup/domain/value-objects/MeetupDescription"
import { MeetupTitle } from "@/meetup/domain/value-objects/MeetupTitle"
import { MeetupDate } from "@/meetup/domain/value-objects/MeetupDate"
import { MeetupLocation } from "@/meetup/domain/value-objects/MeetupLocation"
import { MeetupImageUrl } from "@/meetup/domain/value-objects/MeetupImageUrl"
import { MeetupId } from "@/shared/domain/value-objects/MeetupId"
import { MeetupFinder } from "@/meetup/domain/services/MeetupFinder"

export class MeetupService {
  private meetupFinder: MeetupFinder

  constructor(private meetupRepository: MeetupRepository) {
    this.meetupFinder = new MeetupFinder(meetupRepository)
  }

  async getAllMeetups(): Promise<Meetup[]> {
    return this.meetupRepository.findAll()
  }

  async getMeetupById(id: MeetupId): Promise<Meetup> {
    return this.meetupFinder.run(id.value)
  }

  async createMeetup(data: {
    id: string
    title: string
    description: string
    date: Date
    location: string
    imageUrl: string
  }): Promise<void> {
    const meetup = Meetup.create(
      new MeetupId(data.id),
      new MeetupTitle(data.title),
      new MeetupDescription(data.description),
      new MeetupDate(new Date(data.date)),
      new MeetupLocation(data.location),
      new MeetupImageUrl(data.imageUrl)
    )
    await this.meetupRepository.create(meetup)
  }

  async updateMeetup(
    id: MeetupId,
    data: {
      title?: string
      description?: string
      date?: Date
      location?: string
      imageUrl?: string
    }
  ): Promise<void> {
    const meetup = await this.meetupFinder.run(id.value)

    const updatedMeetup = Meetup.create(
      new MeetupId(meetup.id.value),
      new MeetupTitle(data.title ?? meetup.title.value),
      new MeetupDescription(data.description ?? meetup.description.value),
      new MeetupDate(data.date ? new Date(data.date) : meetup.date.value),
      new MeetupLocation(data.location ?? meetup.location.value),
      new MeetupImageUrl(data.imageUrl ?? meetup.imageUrl.value)
    )
    await this.meetupRepository.update(id.value, updatedMeetup)
  }

  async deleteMeetup(id: MeetupId): Promise<void> {
    await this.meetupFinder.run(id.value)
    await this.meetupRepository.delete(id.value)
  }
}
