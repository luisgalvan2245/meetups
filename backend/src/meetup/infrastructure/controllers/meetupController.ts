import { MeetupService } from "../../application/services/meetupService"
import { MockMeetupRepository } from "../repositories/mockMeetupRepository"
import { EntityId } from "../../../shared/domain/valueObjects/entityId"
import { MeetupModel } from "../models/meetupModel"
import { Route, Get, Post, Put, Delete, Path, Body } from "@tsoa/runtime"

@Route("meetups")
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
  public async getMeetupById(@Path() id: string): Promise<MeetupModel | null> {
    const meetup = await this.meetupService.getMeetupById(EntityId.create(id))
    return meetup ? meetup.toPrimitives() : null
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
    return meetup ? meetup.toPrimitives() : null
  }

  @Delete("{id}")
  public async deleteMeetup(@Path() id: string): Promise<void> {
    await this.meetupService.deleteMeetup(EntityId.create(id))
  }
}
