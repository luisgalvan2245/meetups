import { Event } from "../eventModel"

export interface EventRepository {
  findAll(): Promise<Event[]>
  findById(id: string): Promise<Event | null>
  create(event: Omit<Event, "id" | "createdAt" | "updatedAt">): Promise<Event>
  update(id: string, event: Partial<Event>): Promise<Event | null>
  delete(id: string): Promise<boolean>
}
