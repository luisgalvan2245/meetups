import { Event } from "../../domain/entities/eventEntity"
import { EventRepository } from "../../domain/repositories/eventRepository"

export class MockEventRepository implements EventRepository {
  private events: Event[] = [
    Event.fromPrimitives({
      id: "1",
      title: "Conferencia de Tecnología",
      description: "Una conferencia sobre las últimas tendencias en tecnología",
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 días en el futuro
      location: "Centro de Convenciones",
      imageUrl: "https://example.com/conf.jpg",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }),
    Event.fromPrimitives({
      id: "2",
      title: "Workshop de Programación",
      description: "Aprende las mejores prácticas de programación",
      date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 días en el futuro
      location: "Universidad",
      imageUrl: "https://example.com/workshop.jpg",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })
  ]

  async findAll(): Promise<Event[]> {
    return this.events
  }

  async findById(id: string): Promise<Event | null> {
    return this.events.find(event => event.getId() === id) || null
  }

  async create(event: Event): Promise<Event> {
    this.events.push(event)
    return event
  }

  async update(id: string, event: Event): Promise<Event | null> {
    const index = this.events.findIndex(e => e.getId() === id)
    if (index === -1) return null
    this.events[index] = event
    return event
  }

  async delete(id: string): Promise<boolean> {
    const index = this.events.findIndex(e => e.getId() === id)
    if (index === -1) return false
    this.events.splice(index, 1)
    return true
  }
}
