import { Command } from '../../../Shared/domain/bus/CommandBus/Command'

type Params = {
  id: string
  name?: string
  email?: string
  password?: string
}

export class UpdateUserCommand extends Command {
  readonly id: string
  readonly name?: string
  readonly email?: string
  readonly password?: string

  constructor(params: Params) {
    super()
    this.id = params.id
    this.name = params.name
    this.email = params.email
    this.password = params.password
  }
}
