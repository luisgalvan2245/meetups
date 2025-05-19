import { MeetupService } from "@/meetup/application/services/MeetupService"
import { InMemoryMeetupRepository } from "@/meetup/infrastructure/repositories/InMemoryMeetupRepository"
import { MeetupId } from "@/shared/domain/value-objects/MeetupId"
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
  public async getAllMeetups(): Promise<MeetupModel[]> {
    const meetups = await this.service.getAllMeetups()
    return meetups.map(meetup => meetup.toPrimitives())
  }

  @Get("{id}")
  @Response(404, "Not found")
  @Response(400, "Bad Request")
  public async getMeetupById(@Path() id: string): Promise<MeetupModel | null> {
    const meetup = await this.service.getMeetupById(new MeetupId(id))
    if (!meetup) {
      throw { status: 404, message: "Not found" }
    }

    return meetup.toPrimitives()
  }
}
