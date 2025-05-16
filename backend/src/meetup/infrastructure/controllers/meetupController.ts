import { Controller, Get, Route } from "tsoa"
import { Meetup } from "../../domain/entities/meetupEntity"
import { MeetupService } from "../../application/services/meetupService"
import { MockMeetupRepository } from "../repositories/mockMeetupRepository"

@Route("meetups")
export class MeetupController extends Controller {
  private meetupService: MeetupService

  constructor() {
    super()
    const meetupRepository = new MockMeetupRepository()
    this.meetupService = new MeetupService(meetupRepository)
  }

  @Get()
  public async getMeetups(): Promise<{
    meetups: ReturnType<Meetup["toPrimitives"]>[]
  }> {
    const meetups = await this.meetupService.getMeetups()
    return { meetups: meetups.map(meetup => meetup.toPrimitives()) }
  }
}
