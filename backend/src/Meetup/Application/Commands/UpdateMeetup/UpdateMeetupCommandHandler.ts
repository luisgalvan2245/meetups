import { CommandHandler } from "../../../../Shared/domain/CommandHandler"
import { Command } from "../../../../Shared/Domain/Command"
import { MeetupUpdater } from "./MeetupUpdater"
import { UpdateMeetupCommand } from "./UpdateMeetupCommand"
import { MeetupId } from "../../../../Shared/domain/value-objects/MeetupId"
import { MeetupTitle } from "../../../domain/value-objects/MeetupTitle"
import { MeetupDescription } from "../../../domain/value-objects/MeetupDescription"
import { MeetupDate } from "../../../domain/value-objects/MeetupDate"
import { MeetupLocation } from "../../../domain/value-objects/MeetupLocation"
import { MeetupImageUrl } from "../../../domain/value-objects/MeetupImageUrl"

export class UpdateMeetupCommandHandler
  implements CommandHandler<UpdateMeetupCommand>
{
  constructor(private meetupUpdater: MeetupUpdater) {}

  subscribedTo(): Command {
    return UpdateMeetupCommand
  }

  async handle(command: UpdateMeetupCommand): Promise<void> {
    await this.meetupUpdater.run({
      id: new MeetupId(command.id),
      title: command.title ? new MeetupTitle(command.title) : undefined,
      description: command.description
        ? new MeetupDescription(command.description)
        : undefined,
      date: command.date ? new MeetupDate(new Date(command.date)) : undefined,
      location: command.location
        ? new MeetupLocation(command.location)
        : undefined,
      imageUrl: command.imageUrl
        ? new MeetupImageUrl(command.imageUrl)
        : undefined
    })
  }
}
