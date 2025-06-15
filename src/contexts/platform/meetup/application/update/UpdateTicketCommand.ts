import { Command } from '../../../shared/domain/command/Command'

type Params = {
  id: string
  description?: string
}

export class UpdateTicketCommand extends Command {
  readonly id: string
  readonly description?: string

  constructor(params: Params) {
    super()
    this.id = params.id
    this.description = params.description
  }
}
