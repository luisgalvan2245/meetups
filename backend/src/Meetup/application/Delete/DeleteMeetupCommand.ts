import { Command } from "../../../Shared/domain/Command"

type DeleteMeetupCommandParams = {
  id: string
}

export class DeleteMeetupCommand extends Command {
  id: string

  constructor({ id }: DeleteMeetupCommandParams) {
    super()
    this.id = id
  }
}
