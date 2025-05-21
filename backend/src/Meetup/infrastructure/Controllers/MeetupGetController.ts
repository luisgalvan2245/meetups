import { InMemoryMeetupRepository } from "../../../Meetup/infrastructure/Repositories/InMemoryMeetupRepository"
import { MeetupLister } from "../../application/ListMeetups/MeetupLister"
import { MeetupGetter } from "../../application/GetMeetup/MeetupGetter"
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
  private lister: MeetupLister
  private getter: MeetupGetter

  constructor() {
    const repository = new InMemoryMeetupRepository()
    this.lister = new MeetupLister(repository)
    this.getter = new MeetupGetter(repository)
  }

  @Get()
  async getAllMeetups(): Promise<MeetupModel[]> {
    const meetups = await this.lister.run()
    return meetups.map(meetup => meetup.toPrimitives())
  }

  @Get("{id}")
  @Response(400, "Bad Request")
  @Response(404, "Not found")
  async getMeetupById(@Path() id: string): Promise<MeetupModel> {
    const meetup = await this.getter.run(id)
    return meetup.toPrimitives()
  }
}
