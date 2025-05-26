import { InMemoryStore } from '../../../Shared/infrastructure/Persistance/InMemoryStore'
import { Tag } from '../../domain/Tag'
import { TagRepository } from '../../domain/TagRepository'
import { TagId } from '../../domain/ValueObjects/TagId'
import { TagName } from '../../domain/ValueObjects/TagName'

export class InMemoryTagRepository implements TagRepository {
  private store: InMemoryStore

  constructor() {
    this.store = InMemoryStore.getInstance()
  }

  async save(tag: Tag): Promise<void> {
    this.store.getTags().set(tag.id.toString(), tag)
  }

  async findById(id: TagId): Promise<Tag | null> {
    return this.store.getTags().get(id.toString()) || null
  }

  async findByName(name: TagName): Promise<Tag | null> {
    const tags = Array.from(this.store.getTags().values())
    return tags.find(tag => tag.name.equals(name)) || null
  }

  async findAll(): Promise<Tag[]> {
    return Array.from(this.store.getTags().values())
  }

  async delete(id: TagId): Promise<void> {
    this.store.getTags().delete(id.toString())
  }
}
