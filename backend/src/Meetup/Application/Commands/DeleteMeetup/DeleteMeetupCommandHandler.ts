import { CommandHandler } from "../../../../Shared/Domain/CommandHandler"
import { Command } from "../../../../Shared/Domain/Command"
import { DeleteMeetupCommand } from "./DeleteMeetupCommand"
import { MeetupDeleter } from "./MeetupDeleter"
import { MeetupId } from "../../../Domain/Aggregates/Meetup/MeetupId"

export class DeleteMeetupCommandHandler
  implements CommandHandler<DeleteMeetupCommand>
{
  constructor(private meetupDeleter: MeetupDeleter) {}

  subscribedTo(): Command {
    return DeleteMeetupCommand
  }

  async handle(command: DeleteMeetupCommand): Promise<void> {
    await this.meetupDeleter.run(new MeetupId(command.id))
  }
}
