import { InMemoryMeetupRepository } from "../repositories/InMemoryMeetupRepository"
import { Route, Tags, Get, Path, Response } from "@tsoa/runtime"
import { MeetupLister } from "../../application/find/MeetupLister"
import { MeetupByIdFinder } from "../../application/find/MeetupByIdFinder"

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
  private finder: MeetupByIdFinder

  constructor() {
    const repository = new InMemoryMeetupRepository()
    this.lister = new MeetupLister(repository)
    this.finder = new MeetupByIdFinder(repository)
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
    const meetup = await this.finder.run(id)
    return meetup.toPrimitives()
  }
}
