import { Event } from "../../domain/entities/eventEntity"
import { EventRepository } from "../../domain/repositories/eventRepository"

export class EventService {
  constructor(private readonly eventRepository: EventRepository) {}

  async getEvents(): Promise<Event[]> {
    return this.eventRepository.findAll()
  }

  async getEventById(id: string): Promise<Event | null> {
    return this.eventRepository.findById(id)
  }

  async createEvent(data: {
    title: string
    description: string
    date: string | Date
    location: string
    imageUrl: string
  }): Promise<Event> {
    const event = Event.create(
      data.title,
      data.description,
      data.date,
      data.location,
      data.imageUrl
    )
    return this.eventRepository.create(event)
  }

  async updateEvent(
    id: string,
    data: {
      title?: string
      description?: string
      date?: string | Date
      location?: string
      imageUrl?: string
    }
  ): Promise<Event | null> {
    const event = await this.eventRepository.findById(id)
    if (!event) return null

    event.update(data)
    return this.eventRepository.update(id, event)
  }

  async deleteEvent(id: string): Promise<boolean> {
    return this.eventRepository.delete(id)
  }
}
