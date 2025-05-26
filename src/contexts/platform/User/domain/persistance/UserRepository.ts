import { UserId } from '../../../Shared/domain/value-objects/UserId'
import { User } from '../User'

export interface UserRepository {
  findAll(): Promise<User[]>
  findById(id: UserId): Promise<User | null>
  create(user: User): Promise<void>
  update(user: User): Promise<void>
  delete(id: UserId): Promise<void>
}
