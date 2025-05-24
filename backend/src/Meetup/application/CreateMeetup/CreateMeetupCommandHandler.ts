import { Command } from '../../../Shared/domain/Bus/CommandBus/Command'
import { CommandHandler } from '../../../Shared/domain/Bus/CommandBus/CommandHandler'
import { MeetupDate } from '../../domain/ValueObjects/MeetupDate'
import { MeetupDescription } from '../../domain/ValueObjects/MeetupDescription'
import { MeetupId } from '../../domain/ValueObjects/MeetupId'
import { MeetupImageUrl } from '../../domain/ValueObjects/MeetupImageUrl'
import { MeetupLocation } from '../../domain/ValueObjects/MeetupLocation'
import { MeetupTitle } from '../../domain/ValueObjects/MeetupTitle'
import { CreateMeetupCommand } from './CreateMeetupCommand'
import { MeetupCreator } from './MeetupCreator'

export class CreateMeetupCommandHandler
  implements CommandHandler<CreateMeetupCommand>
{
  constructor(private creator: MeetupCreator) {}

  subscribedTo(): Command {
    return CreateMeetupCommand
  }

  async handle(command: CreateMeetupCommand): Promise<void> {
    await this.creator.run({
      id: new MeetupId(command.id),
      title: new MeetupTitle(command.title),
      description: new MeetupDescription(command.description),
      date: new MeetupDate(new Date(command.date)),
      location: new MeetupLocation(command.location),
      imageUrl: new MeetupImageUrl(command.imageUrl)
    })
  }
}
