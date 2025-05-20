import { Meetup } from "../../domain/entities/Meetup"
import { MeetupRepository } from "../../domain/repositories/MeetupRepository"
import { MeetupDescription } from "../../domain/value-objects/MeetupDescription"
import { MeetupTitle } from "../../domain/value-objects/MeetupTitle"
import { MeetupDate } from "../../domain/value-objects/MeetupDate"
import { MeetupLocation } from "../../domain/value-objects/MeetupLocation"
import { MeetupImageUrl } from "../../domain/value-objects/MeetupImageUrl"
import { MeetupId } from "../../../shared/domain/value-objects/MeetupId"
import { MeetupFinder } from "../../domain/services/MeetupFinder"

export class MeetupService {
  private finder: MeetupFinder

  constructor(private repository: MeetupRepository) {
    this.finder = new MeetupFinder(repository)
  }

  async getAllMeetups(): Promise<Meetup[]> {
    return this.repository.findAll()
  }

  async getMeetupById(id: MeetupId): Promise<Meetup> {
    return this.finder.run(id.value)
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
    await this.repository.create(meetup)
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
    const meetup = await this.finder.run(id.value)

    if (data.title) {
      meetup.updateTitle(new MeetupTitle(data.title))
    }
    if (data.description) {
      meetup.updateDescription(new MeetupDescription(data.description))
    }
    if (data.date) {
      meetup.updateDate(new MeetupDate(new Date(data.date)))
    }
    if (data.location) {
      meetup.updateLocation(new MeetupLocation(data.location))
    }
    if (data.imageUrl) {
      meetup.updateImageUrl(new MeetupImageUrl(data.imageUrl))
    }

    await this.repository.update(id.value, meetup)
  }

  async deleteMeetup(id: MeetupId): Promise<void> {
    await this.finder.run(id.value)
    await this.repository.delete(id.value)
  }
}
