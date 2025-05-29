import { Command } from '../../../shared/domain/command/Command'

type Params = {
  id: string
  name: string
  email: string
  password: string
}

export class CreateUserCommand extends Command {
  readonly id: string
  readonly name: string
  readonly email: string
  readonly password: string

  constructor({ id, name, email, password }: Params) {
    super()
    this.id = id
    this.name = name
    this.email = email
    this.password = password
  }
}
