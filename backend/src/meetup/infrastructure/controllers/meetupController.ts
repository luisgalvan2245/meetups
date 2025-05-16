import { MeetupService } from "@/meetup/application/services/meetupService"
import { MockMeetupRepository } from "@/meetup/infrastructure/repositories/mockMeetupRepository"
import { EntityId } from "@/shared/domain/valueObjects/entityId"

export interface MeetupModel {
  id: string
  title: string
  description: string
  date: string
  location: string
  imageUrl: string
  createdAt: string
  updatedAt: string
}

export class MeetupController {
  private meetupService: MeetupService

  constructor() {
    const meetupRepository = new MockMeetupRepository()
    this.meetupService = new MeetupService(meetupRepository)
  }

  public async getAllMeetups(): Promise<MeetupModel[]> {
    const meetups = await this.meetupService.getAllMeetups()
    return meetups.map(meetup => meetup.toPrimitives())
  }

  public async getMeetupById(id: string): Promise<MeetupModel | null> {
    const meetup = await this.meetupService.getMeetupById(EntityId.create(id))
    return meetup ? meetup.toPrimitives() : null
  }

  public async createMeetup(meetupData: {
    title: string
    description: string
    date: Date
    location: string
    imageUrl: string
  }): Promise<MeetupModel> {
    const meetup = await this.meetupService.createMeetup(meetupData)
    return meetup.toPrimitives()
  }

  public async updateMeetup(
    id: string,
    meetupData: {
      title?: string
      description?: string
      date?: Date
      location?: string
      imageUrl?: string
    }
  ): Promise<MeetupModel | null> {
    const meetup = await this.meetupService.updateMeetup(
      EntityId.create(id),
      meetupData
    )
    return meetup ? meetup.toPrimitives() : null
  }

  public async deleteMeetup(id: string): Promise<void> {
    await this.meetupService.deleteMeetup(EntityId.create(id))
  }
}
