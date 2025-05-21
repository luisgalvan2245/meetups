import { CommandHandler } from "../../../../Shared/Domain/CommandHandler"
import { Command } from "../../../../Shared/Domain/Command"
import { MeetupCreator } from "./MeetupCreator"
import { CreateMeetupCommand } from "./CreateMeetupCommand"
import { MeetupId } from "../../../Domain/Aggregates/Meetup/MeetupId"
import { MeetupTitle } from "../../../Domain/ValueObjects/MeetupTitle"
import { MeetupDescription } from "../../../Domain/ValueObjects/MeetupDescription"
import { MeetupDate } from "../../../Domain/ValueObjects/MeetupDate"
import { MeetupLocation } from "../../../Domain/ValueObjects/MeetupLocation"
import { MeetupImageUrl } from "../../../Domain/ValueObjects/MeetupImageUrl"

export class CreateMeetupCommandHandler
  implements CommandHandler<CreateMeetupCommand>
{
  constructor(private meetupCreator: MeetupCreator) {}

  subscribedTo(): Command {
    return CreateMeetupCommand
  }

  async handle(command: CreateMeetupCommand): Promise<void> {
    await this.meetupCreator.run({
      id: new MeetupId(command.id),
      title: new MeetupTitle(command.title),
      description: new MeetupDescription(command.description),
      date: new MeetupDate(new Date(command.date)),
      location: new MeetupLocation(command.location),
      imageUrl: new MeetupImageUrl(command.imageUrl)
    })
  }
}
