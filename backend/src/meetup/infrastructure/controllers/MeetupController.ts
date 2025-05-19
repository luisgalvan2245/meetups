import { MeetupService } from "@/meetup/application/services/MeetupService"
import { InMemoryMeetupRepository } from "@/meetup/infrastructure/repositories/InMemoryMeetupRepository"
import { MeetupId } from "@/shared/domain/value-objects/MeetupId"
import {
  Route,
  Tags,
  Get,
  Patch,
  Put,
  Delete,
  Path,
  Body,
  Response,
  SuccessResponse
} from "@tsoa/runtime"
import { validate as uuidValidate } from "uuid"

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
export class MeetupController {
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
    if (!uuidValidate(id)) {
      throw { status: 400, message: "Invalid UUID format" }
    }

    const meetup = await this.service.getMeetupById(new MeetupId(id))
    if (!meetup) {
      throw { status: 404, message: "Not found" }
    }

    return meetup.toPrimitives()
  }

  @Put("{id}")
  @SuccessResponse(201, "Created")
  @Response(400, "Bad Request")
  public async createMeetup(
    @Path() id: string,
    @Body()
    data: {
      title: string
      description: string
      date: Date
      location: string
      imageUrl: string
    }
  ): Promise<MeetupModel> {
    if (!uuidValidate(id)) {
      throw { status: 400, message: "Invalid UUID format" }
    }

    const meetup = await this.service.createMeetup({ id, ...data })
    return meetup.toPrimitives()
  }

  @Patch("{id}")
  @SuccessResponse(200, "Updated")
  @Response(404, "Not found")
  @Response(400, "Bad Request")
  public async updateMeetup(
    @Path() id: string,
    @Body()
    data: {
      title?: string
      description?: string
      date?: Date
      location?: string
      imageUrl?: string
    }
  ): Promise<MeetupModel | null> {
    if (!uuidValidate(id)) {
      throw { status: 400, message: "Invalid UUID format" }
    }

    const meetup = await this.service.updateMeetup(new MeetupId(id), data)
    if (!meetup) {
      throw { status: 404, message: "Not found" }
    }

    return meetup.toPrimitives()
  }

  @Delete("{id}")
  @SuccessResponse(204, "No Content")
  @Response(404, "Not found")
  @Response(400, "Bad Request")
  public async deleteMeetup(@Path() id: string): Promise<void> {
    if (!uuidValidate(id)) {
      throw { status: 400, message: "Invalid UUID format" }
    }

    const deleted = await this.service.deleteMeetup(new MeetupId(id))
    if (!deleted) {
      throw { status: 404, message: "Not found" }
    }
  }
}
