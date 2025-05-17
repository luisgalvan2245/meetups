import { MeetupService } from "@/meetup/application/services/meetup-service"
import { MockMeetupRepository } from "@/meetup/infrastructure/repositories/mock-meetup-repository"
import { EntityId } from "@/shared/domain/value-objects/entity-id"
import {
  Route,
  Tags,
  Get,
  Post,
  Put,
  Delete,
  Path,
  Body,
  Response
} from "@tsoa/runtime"

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

@Route("meetups")
@Tags("Meetups")
export class MeetupController {
  private meetupService: MeetupService

  constructor() {
    const meetupRepository = new MockMeetupRepository()
    this.meetupService = new MeetupService(meetupRepository)
  }

  @Get()
  public async getAllMeetups(): Promise<MeetupModel[]> {
    const meetups = await this.meetupService.getAllMeetups()
    return meetups.map(meetup => meetup.toPrimitives())
  }

  @Get("{id}")
  @Response(404, "Meetup not found")
  public async getMeetupById(@Path() id: string): Promise<MeetupModel | null> {
    const meetup = await this.meetupService.getMeetupById(EntityId.create(id))
    if (!meetup) {
      throw { status: 404, message: "Meetup not found" }
    }
    return meetup.toPrimitives()
  }

  @Post()
  public async createMeetup(
    @Body()
    meetupData: {
      title: string
      description: string
      date: Date
      location: string
      imageUrl: string
    }
  ): Promise<MeetupModel> {
    const meetup = await this.meetupService.createMeetup(meetupData)
    return meetup.toPrimitives()
  }

  @Put("{id}")
  @Response(404, "Meetup not found")
  public async updateMeetup(
    @Path() id: string,
    @Body()
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
    if (!meetup) {
      throw { status: 404, message: "Meetup not found" }
    }
    return meetup.toPrimitives()
  }

  @Delete("{id}")
  @Response(404, "Meetup not found")
  public async deleteMeetup(@Path() id: string): Promise<void> {
    const deleted = await this.meetupService.deleteMeetup(EntityId.create(id))
    if (!deleted) {
      throw { status: 404, message: "Meetup not found" }
    }
  }
}
