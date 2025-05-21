import { CommandHandler } from "../../../../Shared/Domain/CommandHandler"
import { Command } from "../../../../Shared/Domain/Command"
import { MeetupUpdater } from "./MeetupUpdater"
import { UpdateMeetupCommand } from "./UpdateMeetupCommand"
import { MeetupId } from "../../../Domain/Aggregates/Meetup/MeetupId"
import { MeetupTitle } from "../../../Domain/ValueObjects/MeetupTitle"
import { MeetupDescription } from "../../../Domain/ValueObjects/MeetupDescription"
import { MeetupDate } from "../../../Domain/ValueObjects/MeetupDate"
import { MeetupLocation } from "../../../Domain/ValueObjects/MeetupLocation"
import { MeetupImageUrl } from "../../../Domain/ValueObjects/MeetupImageUrl"

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
