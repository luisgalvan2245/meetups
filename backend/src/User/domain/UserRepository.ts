import { User } from './User'
import { Email } from './ValueObjects/Email'
import { UserId } from './ValueObjects/UserId'
import { Username } from './ValueObjects/Username'

export interface UserRepository {
  save(user: User): Promise<void>
  findById(id: UserId): Promise<User | null>
  findByEmail(email: Email): Promise<User | null>
  findByUsername(username: Username): Promise<User | null>
  delete(id: UserId): Promise<void>
}
