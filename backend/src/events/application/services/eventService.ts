import { Event } from "../../domain/eventModel"
import { EventRepository } from "../../domain/repositories/eventRepository"

export class EventService {
  constructor(private readonly eventRepository: EventRepository) {}

  async getEvents(): Promise<Event[]> {
    return this.eventRepository.findAll()
  }

  async getEventById(id: string): Promise<Event | null> {
    return this.eventRepository.findById(id)
  }

  async createEvent(
    eventData: Omit<Event, "id" | "createdAt" | "updatedAt">
  ): Promise<Event> {
    return this.eventRepository.create(eventData)
  }

  async updateEvent(
    id: string,
    eventData: Partial<Event>
  ): Promise<Event | null> {
    return this.eventRepository.update(id, eventData)
  }

  async deleteEvent(id: string): Promise<boolean> {
    return this.eventRepository.delete(id)
  }
}
