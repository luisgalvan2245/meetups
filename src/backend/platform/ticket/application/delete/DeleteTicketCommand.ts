import { Command } from '../../../shared/domain/command/Command'

type Params = {
  id: string
}

export class DeleteTicketCommand extends Command {
  readonly id: string

  constructor({ id }: Params) {
    super()
    this.id = id
  }
}
