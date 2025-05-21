import { CommandHandler } from "../../../Shared/domain/CommandHandler"
import { Command } from "../../../Shared/domain/Command"
import { MeetupUpdater } from "./MeetupUpdater"
import { UpdateMeetupCommand } from "./UpdateMeetupCommand"

export class UpdateMeetupCommandHandler
  implements CommandHandler<UpdateMeetupCommand>
{
  constructor(private meetupUpdater: MeetupUpdater) {}

  subscribedTo(): Command {
    return UpdateMeetupCommand
  }

  async handle(command: UpdateMeetupCommand): Promise<void> {
    await this.meetupUpdater.run(
      command.id,
      command.title,
      command.description,
      command.date,
      command.location,
      command.imageUrl
    )
  }
}
