import { AggregateRoot } from '../../shared/domain/AggregateRoot'
import { UserId } from '../../shared/domain/value-objects/UserId'
import { UserCreatedDomainEvent } from './eventsUserCreatedDomainEvent'
import { UserDeletedDomainEvent } from './eventsUserDeletedDomainEvent'
import { UserEmailUpdatedDomainEvent } from './eventsUserEmailUpdatedDomainEvent'
import { UserNameUpdatedDomainEvent } from './eventsUserNameUpdatedDomainEvent'
import { UserPasswordUpdatedDomainEvent } from './eventsUserPasswordUpdatedDomainEvent'
import { UserEmail } from './value-objects/UserEmail'
import { UserName } from './value-objects/UserName'
import { UserPassword } from './value-objects/UserPassword'

export class User extends AggregateRoot {
  readonly id: UserId
  private _name: UserName
  private _email: UserEmail
  private _password: UserPassword
  private _isDeleted: boolean

  constructor(
    id: UserId,
    name: UserName,
    email: UserEmail,
    password: UserPassword
  ) {
    super()
    this.id = id
    this._name = name
    this._email = email
    this._password = password
    this._isDeleted = false
  }

  static create(
    id: UserId,
    name: UserName,
    email: UserEmail,
    password: UserPassword
  ): User {
    const user = new User(id, name, email, password)
    const event = new UserCreatedDomainEvent({
      aggregateId: user.id.value,
      name: user.name.value,
      email: user.email.value
    })
    user.record(event)
    return user
  }

  static fromPrimitives(data: {
    id: string
    name: string
    email: string
    password: string
    isDeleted: boolean
  }): User {
    const user = new User(
      new UserId(data.id),
      new UserName(data.name),
      new UserEmail(data.email),
      new UserPassword(data.password)
    )
    user._isDeleted = data.isDeleted
    return user
  }

  toPrimitives() {
    return {
      id: this.id.value,
      name: this._name.value,
      email: this._email.value,
      password: this._password.value,
      isDeleted: this._isDeleted
    }
  }

  get name() {
    return this._name
  }

  get email() {
    return this._email
  }

  get password() {
    return this._password
  }

  get isDeleted() {
    return this._isDeleted
  }

  updateName(name: UserName): void {
    this._name = name
    const event = new UserNameUpdatedDomainEvent({
      aggregateId: this.id.value,
      name: name.value
    })
    this.record(event)
  }

  updateEmail(email: UserEmail): void {
    this._email = email
    const event = new UserEmailUpdatedDomainEvent({
      aggregateId: this.id.value,
      email: email.value
    })
    this.record(event)
  }

  updatePassword(password: UserPassword): void {
    this._password = password
    const event = new UserPasswordUpdatedDomainEvent({
      aggregateId: this.id.value
    })
    this.record(event)
  }

  markAsDeleted(): void {
    this._isDeleted = true
    const event = new UserDeletedDomainEvent({
      aggregateId: this.id.value
    })
    this.record(event)
  }
}
