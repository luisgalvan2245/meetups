import { Command } from '../../../shared/domain/command/Command'

type Params = {
  id: string
}

export class DeleteUserCommand extends Command {
  readonly id: string

  constructor({ id }: Params) {
    super()
    this.id = id
  }
}
