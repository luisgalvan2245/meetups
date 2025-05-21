import { CommandHandler } from "../../../Shared/domain/CommandHandler"
import { Command } from "../../../Shared/domain/Command"
import { MeetupCreator } from "./MeetupCreator"
import { CreateMeetupCommand } from "./CreateMeetupCommand"

export class CreateMeetupCommandHandler
  implements CommandHandler<CreateMeetupCommand>
{
  constructor(private meetupCreator: MeetupCreator) {}

  subscribedTo(): Command {
    return CreateMeetupCommand
  }

  async handle(command: CreateMeetupCommand): Promise<void> {
    await this.meetupCreator.run({
      id: command.id,
      title: command.title,
      description: command.description,
      date: command.date,
      location: command.location,
      imageUrl: command.imageUrl
    })
  }
}
