import { CommandHandler } from "../../../Shared/domain/CommandHandler"
import { Command } from "../../../Shared/domain/Command"
import { MeetupCreator } from "./MeetupCreator"
import { CreateMeetupCommand } from "./CreateMeetupCommand"
import { MeetupId } from "../../domain/ValueObjects/MeetupId"
import { MeetupTitle } from "../../domain/ValueObjects/MeetupTitle"
import { MeetupDescription } from "../../domain/ValueObjects/MeetupDescription"
import { MeetupDate } from "../../domain/ValueObjects/MeetupDate"
import { MeetupLocation } from "../../domain/ValueObjects/MeetupLocation"
import { MeetupImageUrl } from "../../domain/ValueObjects/MeetupImageUrl"

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
