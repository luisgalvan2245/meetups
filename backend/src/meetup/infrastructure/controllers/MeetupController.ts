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
import express from "express"

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
  private meetupService: MeetupService

  constructor() {
    const meetupRepository = new InMemoryMeetupRepository()
    this.meetupService = new MeetupService(meetupRepository)
  }

  @Get()
  public async getAllMeetups(): Promise<MeetupModel[]> {
    const meetups = await this.meetupService.getAllMeetups()
    return meetups.map(meetup => meetup.toPrimitives())
  }

  @Get("{id}")
  @Response(404, "Not found")
  @Response(400, "Bad Request")
  public async getMeetupById(@Path() id: string): Promise<MeetupModel | null> {
    if (!uuidValidate(id)) {
      throw { status: 400, message: "Invalid UUID format" }
    }

    const meetup = await this.meetupService.getMeetupById(new MeetupId(id))
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
    meetupData: {
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

    const meetup = await this.meetupService.createMeetup({
      ...meetupData,
      id
    })

    return meetup.toPrimitives()
  }

  @Patch("{id}")
  @SuccessResponse(200, "Updated")
  @Response(404, "Not found")
  @Response(400, "Bad Request")
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
    if (!uuidValidate(id)) {
      throw { status: 400, message: "Invalid UUID format" }
    }

    const meetup = await this.meetupService.updateMeetup(
      new MeetupId(id),
      meetupData
    )
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

    const deleted = await this.meetupService.deleteMeetup(new MeetupId(id))
    if (!deleted) {
      throw { status: 404, message: "Not found" }
    }
  }
}
