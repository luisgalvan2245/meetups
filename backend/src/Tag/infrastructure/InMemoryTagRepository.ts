import { Tag } from '../domain/Tag'
import { TagRepository } from '../domain/TagRepository'
import { TagId } from '../domain/ValueObjects/TagId'
import { TagName } from '../domain/ValueObjects/TagName'

export class InMemoryTagRepository implements TagRepository {
  private readonly tags: Map<string, Tag> = new Map()

  async save(tag: Tag): Promise<void> {
    this.tags.set(tag.id.toString(), tag)
  }

  async findById(id: TagId): Promise<Tag | null> {
    const tag = this.tags.get(id.toString())
    return tag ? tag : null
  }

  async findByName(name: TagName): Promise<Tag | null> {
    for (const tag of this.tags.values()) {
      if (tag.name.equals(name)) {
        return tag
      }
    }
    return null
  }

  async findAll(): Promise<Tag[]> {
    return Array.from(this.tags.values())
  }

  async delete(id: TagId): Promise<void> {
    this.tags.delete(id.toString())
  }
}
