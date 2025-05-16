import { Event } from "../../domain/eventModel"
import { EventRepository } from "../../domain/repositories/eventRepository"

export class MockEventRepository implements EventRepository {
  private events: Event[] = [
    {
      id: "1",
      title: "Conferencia de Tecnología",
      description: "Una conferencia sobre las últimas tendencias en tecnología",
      date: "2024-04-15T10:00:00Z",
      location: "Centro de Convenciones",
      imageUrl: "https://example.com/conf.jpg",
      createdAt: "2024-03-15T10:00:00Z",
      updatedAt: "2024-03-15T10:00:00Z"
    },
    {
      id: "2",
      title: "Workshop de Programación",
      description: "Aprende programación desde cero",
      date: "2024-04-20T14:00:00Z",
      location: "Espacio Coworking",
      imageUrl: "https://example.com/workshop.jpg",
      createdAt: "2024-03-15T10:00:00Z",
      updatedAt: "2024-03-15T10:00:00Z"
    }
  ]

  async findAll(): Promise<Event[]> {
    return this.events
  }

  async findById(id: string): Promise<Event | null> {
    return this.events.find(event => event.id === id) || null
  }

  async create(
    eventData: Omit<Event, "id" | "createdAt" | "updatedAt">
  ): Promise<Event> {
    const now = new Date().toISOString()
    const newEvent: Event = {
      ...eventData,
      id: (this.events.length + 1).toString(),
      createdAt: now,
      updatedAt: now
    }
    this.events.push(newEvent)
    return newEvent
  }

  async update(id: string, eventData: Partial<Event>): Promise<Event | null> {
    const index = this.events.findIndex(event => event.id === id)
    if (index === -1) return null

    const updatedEvent = {
      ...this.events[index],
      ...eventData,
      updatedAt: new Date().toISOString()
    }
    this.events[index] = updatedEvent
    return updatedEvent
  }

  async delete(id: string): Promise<boolean> {
    const index = this.events.findIndex(event => event.id === id)
    if (index === -1) return false

    this.events.splice(index, 1)
    return true
  }
}
