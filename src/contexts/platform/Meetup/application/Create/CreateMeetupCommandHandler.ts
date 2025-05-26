import { Command } from '../../../Shared/domain/bus/CommandBus/Command'
import { CommandHandler } from '../../../Shared/domain/bus/CommandBus/CommandHandler'
import { UserId } from '../../../Shared/domain/value-objects/UserId'
import { MeetupDate } from '../../domain/value-objects/MeetupDate'
import { MeetupDescription } from '../../domain/value-objects/MeetupDescription'
import { MeetupId } from '../../domain/value-objects/MeetupId'
import { MeetupImageUrl } from '../../domain/value-objects/MeetupImageUrl'
import { MeetupLocation } from '../../domain/value-objects/MeetupLocation'
import { MeetupTitle } from '../../domain/value-objects/MeetupTitle'
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
      imageUrl: new MeetupImageUrl(command.imageUrl),
      organizerId: new UserId(command.organizerId)
    })
  }
}
