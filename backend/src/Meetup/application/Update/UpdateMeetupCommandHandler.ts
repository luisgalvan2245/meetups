import {
  CommandHandler,
  CommandClass
} from "../../../Shared/domain/CommandHandler"
import { MeetupUpdater } from "./MeetupUpdater"
import { UpdateMeetupCommand } from "./UpdateMeetupCommand"

export class UpdateMeetupCommandHandler
  implements CommandHandler<UpdateMeetupCommand>
{
  constructor(private meetupUpdater: MeetupUpdater) {}

  subscribedTo(): CommandClass<UpdateMeetupCommand> {
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
