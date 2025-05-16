import { Controller, Get, Route } from "tsoa"
import { Event } from "../../domain/eventModel"
import { EventService } from "../../application/services/eventService"
import { MockEventRepository } from "../repositories/mockEventRepository"

@Route("events")
export class EventController extends Controller {
  private eventService: EventService

  constructor() {
    super()
    const eventRepository = new MockEventRepository()
    this.eventService = new EventService(eventRepository)
  }

  @Get()
  public async getEvents(): Promise<{ events: Event[] }> {
    const events = await this.eventService.getEvents()
    return { events }
  }
}
