import { CommandHandler } from "../../../../Shared/domain/CommandHandler"
import { Command } from "../../../../Shared/domain/Command"
import { MeetupUpdater } from "./MeetupUpdater"
import { UpdateMeetupCommand } from "./UpdateMeetupCommand"
import { MeetupId } from "../../../domain/Aggregates/Meetup/MeetupId"
import { MeetupTitle } from "../../../domain/ValueObjects/MeetupTitle"
import { MeetupDescription } from "../../../domain/ValueObjects/MeetupDescription"
import { MeetupDate } from "../../../domain/ValueObjects/MeetupDate"
import { MeetupLocation } from "../../../domain/ValueObjects/MeetupLocation"
import { MeetupImageUrl } from "../../../domain/ValueObjects/MeetupImageUrl"

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
