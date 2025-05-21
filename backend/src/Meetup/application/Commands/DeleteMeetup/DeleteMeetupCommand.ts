import { Command } from "../../../../Shared/domain/Command"

type Params = {
  id: string
}

export class DeleteMeetupCommand extends Command {
  readonly id: string

  constructor({ id }: Params) {
    super()
    this.id = id
  }
}
