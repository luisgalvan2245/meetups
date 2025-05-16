import { Event } from "../entities/eventEntity"

export interface EventRepository {
  findAll(): Promise<Event[]>
  findById(id: string): Promise<Event | null>
  create(event: Event): Promise<Event>
  update(id: string, event: Event): Promise<Event | null>
  delete(id: string): Promise<boolean>
}
