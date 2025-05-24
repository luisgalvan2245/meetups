import { Tag } from './Tag'
import { TagId } from './ValueObjects/TagId'
import { TagName } from './ValueObjects/TagName'

export interface TagRepository {
  save(tag: Tag): Promise<void>
  findById(id: TagId): Promise<Tag | null>
  findByName(name: TagName): Promise<Tag | null>
  findAll(): Promise<Tag[]>
  delete(id: TagId): Promise<void>
}
