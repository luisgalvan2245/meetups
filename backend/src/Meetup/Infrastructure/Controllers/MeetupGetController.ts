import { InMemoryMeetupRepository } from "../repositories/InMemoryMeetupRepository"
import { Route, Tags, Get, Path, Response } from "@tsoa/runtime"
import { MeetupSearcher } from "../../application/Search/MeetupSearcher"
import { MeetupFinder } from "../../application/Find/MeetupFinder"

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
  private searcher: MeetupSearcher
  private finder: MeetupFinder

  constructor() {
    const repository = new InMemoryMeetupRepository()
    this.searcher = new MeetupSearcher(repository)
    this.finder = new MeetupFinder(repository)
  }

  @Get()
  async getAllMeetups(): Promise<MeetupModel[]> {
    const meetups = await this.searcher.run()
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
