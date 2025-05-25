import { Command } from '../../../Shared/domain/Bus/CommandBus/Command'

export class CreateUserCommand extends Command {
  readonly name: string
  readonly email: string
  readonly password: string

  constructor(params: { name: string; email: string; password: string }) {
    super()
    this.name = params.name
    this.email = params.email
    this.password = params.password
  }
}
