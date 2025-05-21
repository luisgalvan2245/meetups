import { CommandHandler } from "../../../Shared/domain/CommandHandler"
import { Command } from "../../../Shared/domain/Command"
import { DeleteMeetupCommand } from "./DeleteMeetupCommand"
import { MeetupDeleter } from "./MeetupDeleter"

export class DeleteMeetupCommandHandler
  implements CommandHandler<DeleteMeetupCommand>
{
  constructor(private meetupDeleter: MeetupDeleter) {}

  subscribedTo(): Command {
    return DeleteMeetupCommand
  }

  async handle(command: DeleteMeetupCommand): Promise<void> {
    await this.meetupDeleter.run(command.id)
  }
}
