import { AggregateRoot } from '../../Shared/domain/AggregateRoot'
import { UserCreatedDomainEvent } from './Events/UserCreatedDomainEvent'
import { UserDeletedDomainEvent } from './Events/UserDeletedDomainEvent'
import { UserUpdatedDomainEvent } from './Events/UserUpdatedDomainEvent'
import { Email } from './ValueObjects/Email'
import { Password } from './ValueObjects/Password'
import { UserId } from './ValueObjects/UserId'
import { Username } from './ValueObjects/Username'

export interface UserPrimitives {
  id: string
  username: string
  email: string
  password: string
  role: string
  createdAt: string
  isActive: boolean
}

export class User extends AggregateRoot {
  readonly id: UserId
  private _username: Username
  private _email: Email
  private _password: Password
  private _role: string
  private _createdAt: Date
  private _isActive: boolean

  constructor(
    id: UserId,
    username: Username,
    email: Email,
    password: Password,
    role: string,
    createdAt: Date,
    isActive: boolean
  ) {
    super()
    this.id = id
    this._username = username
    this._email = email
    this._password = password
    this._role = role
    this._createdAt = createdAt
    this._isActive = isActive
  }

  static create(
    id: UserId,
    username: Username,
    email: Email,
    password: Password,
    role: string
  ): User {
    const user = new User(id, username, email, password, role, new Date(), true)

    const event = new UserCreatedDomainEvent({
      aggregateId: user.id.toString(),
      username: user.username.toString(),
      email: user.email.toString(),
      role: user.role
    })

    user.record(event)
    return user
  }

  static fromPrimitives(data: UserPrimitives): User {
    return new User(
      new UserId(data.id),
      new Username(data.username),
      new Email(data.email),
      new Password(data.password),
      data.role,
      new Date(data.createdAt),
      data.isActive
    )
  }

  toPrimitives(): UserPrimitives {
    return {
      id: this.id.toString(),
      username: this.username.toString(),
      email: this.email.toString(),
      password: this.password.toString(),
      role: this.role,
      createdAt: this.createdAt.toISOString(),
      isActive: this.isActive
    }
  }

  get username(): Username {
    return this._username
  }

  get email(): Email {
    return this._email
  }

  get password(): Password {
    return this._password
  }

  get role(): string {
    return this._role
  }

  get createdAt(): Date {
    return this._createdAt
  }

  get isActive(): boolean {
    return this._isActive
  }

  updateUsername(username: Username): void {
    this._username = username
    const event = new UserUpdatedDomainEvent({
      aggregateId: this.id.toString(),
      username: username.toString()
    })
    this.record(event)
  }

  updateEmail(email: Email): void {
    this._email = email
    const event = new UserUpdatedDomainEvent({
      aggregateId: this.id.toString(),
      email: email.toString()
    })
    this.record(event)
  }

  updatePassword(password: Password): void {
    this._password = password
    const event = new UserUpdatedDomainEvent({
      aggregateId: this.id.toString(),
      password: password.toString()
    })
    this.record(event)
  }

  updateRole(role: string): void {
    this._role = role
    const event = new UserUpdatedDomainEvent({
      aggregateId: this.id.toString(),
      role: role
    })
    this.record(event)
  }

  deactivate(): void {
    this._isActive = false
    const event = new UserDeletedDomainEvent({
      aggregateId: this.id.toString()
    })
    this.record(event)
  }
}
