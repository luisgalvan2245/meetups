import {
  CommandHandler,
  CommandClass
} from "../../../Shared/domain/CommandHandler"
import { DeleteMeetupCommand } from "./DeleteMeetupCommand"
import { MeetupDeleter } from "./MeetupDeleter"

export class DeleteMeetupCommandHandler
  implements CommandHandler<DeleteMeetupCommand>
{
  constructor(private meetupDeleter: MeetupDeleter) {}

  subscribedTo(): CommandClass<DeleteMeetupCommand> {
    return DeleteMeetupCommand
  }

  async handle(command: DeleteMeetupCommand): Promise<void> {
    await this.meetupDeleter.run(command.id)
  }
}
