import { CommandHandler } from "../../../../Shared/domain/CommandHandler"
import { Command } from "../../../../Shared/Domain/Command"
import { MeetupCreator } from "../../../application/Create/MeetupCreator"
import { CreateMeetupCommand } from "../../../application/Create/CreateMeetupCommand"
import { MeetupId } from "../../../../Shared/domain/value-objects/MeetupId"
import { MeetupTitle } from "../../../domain/value-objects/MeetupTitle"
import { MeetupDescription } from "../../../domain/value-objects/MeetupDescription"
import { MeetupDate } from "../../../domain/value-objects/MeetupDate"
import { MeetupLocation } from "../../../domain/value-objects/MeetupLocation"
import { MeetupImageUrl } from "../../../domain/value-objects/MeetupImageUrl"

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
