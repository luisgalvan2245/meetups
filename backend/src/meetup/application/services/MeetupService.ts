import { Meetup } from "@/meetup/domain/entities/Meetup"
import { MeetupRepository } from "@/meetup/domain/repositories/MeetupRepository"
import { MeetupDescription } from "@/meetup/domain/value-objects/MeetupDescription"
import { MeetupTitle } from "@/meetup/domain/value-objects/MeetupTitle"
import { MeetupDate } from "@/meetup/domain/value-objects/MeetupDate"
import { MeetupLocation } from "@/meetup/domain/value-objects/MeetupLocation"
import { MeetupImageUrl } from "@/meetup/domain/value-objects/MeetupImageUrl"
import { MeetupId } from "@/shared/domain/value-objects/MeetupId"
import { MeetupFinder } from "@/meetup/domain/services/MeetupFinder"
import { InvalidArgumentError } from "@/shared/domain/errors/InvalidArgumentError"

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

  async createMeetup(meetupData: {
    id: string
    title: string
    description: string
    date: Date
    location: string
    imageUrl: string
  }): Promise<void> {
    // Solo validar que date sea una fecha válida
    if (isNaN(new Date(meetupData.date).getTime())) {
      throw new InvalidArgumentError("Date must be a valid date")
    }

    const meetup = Meetup.create(
      new MeetupId(meetupData.id),
      new MeetupTitle(meetupData.title),
      new MeetupDescription(meetupData.description),
      new MeetupDate(new Date(meetupData.date)),
      new MeetupLocation(meetupData.location),
      new MeetupImageUrl(meetupData.imageUrl)
    )
    await this.meetupRepository.create(meetup)
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
  ): Promise<void> {
    const meetup = await this.meetupFinder.run(id.value)

    const updatedMeetup = Meetup.create(
      new MeetupId(meetup.id.value),
      new MeetupTitle(meetupData.title ?? meetup.title.value),
      new MeetupDescription(meetupData.description ?? meetup.description.value),
      new MeetupDate(
        meetupData.date ? new Date(meetupData.date) : meetup.date.value
      ),
      new MeetupLocation(meetupData.location ?? meetup.location.value),
      new MeetupImageUrl(meetupData.imageUrl ?? meetup.imageUrl.value)
    )
    await this.meetupRepository.update(id.value, updatedMeetup)
  }

  async deleteMeetup(id: MeetupId): Promise<void> {
    await this.meetupFinder.run(id.value)
    await this.meetupRepository.delete(id.value)
  }
}
