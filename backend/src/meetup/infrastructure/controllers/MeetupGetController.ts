import { MeetupService } from "../../application/services/MeetupService"
import { InMemoryMeetupRepository } from "../repositories/InMemoryMeetupRepository"
import { MeetupId } from "../../../shared/domain/value-objects/MeetupId"
import { Route, Tags, Get, Path, Response } from "@tsoa/runtime"

export interface MeetupModel {
  id: string
  title: string
  description: string
  date: string
  location: string
  imageUrl: string
}

@Route("meetups")
@Tags("Meetups")
export class MeetupGetController {
  private service: MeetupService

  constructor() {
    const repository = new InMemoryMeetupRepository()
    this.service = new MeetupService(repository)
  }

  @Get()
  async getAllMeetups(): Promise<MeetupModel[]> {
    const meetups = await this.service.getAllMeetups()
    return meetups.map(meetup => meetup.toPrimitives())
  }

  @Get("{id}")
  @Response(400, "Bad Request")
  @Response(404, "Not found")
  async getMeetupById(@Path() id: string): Promise<MeetupModel> {
    const meetup = await this.service.getMeetupById(new MeetupId(id))
    return meetup.toPrimitives()
  }
}
