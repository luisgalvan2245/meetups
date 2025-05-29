import { Command } from '../../../shared/domain/command/Command'
import { CommandHandler } from '../../../shared/domain/command/CommandHandler'
import { UserId } from '../../../shared/domain/value-objects/UserId'
import { MeetupDate } from '../../domain/value-objects/MeetupDate'
import { MeetupDescription } from '../../domain/value-objects/MeetupDescription'
import { MeetupId } from '../../domain/value-objects/MeetupId'
import { MeetupImageUrl } from '../../domain/value-objects/MeetupImageUrl'
import { MeetupLocation } from '../../domain/value-objects/MeetupLocation'
import { MeetupTitle } from '../../domain/value-objects/MeetupTitle'
import { MeetupUpdater } from './MeetupUpdater'
import { UpdateMeetupCommand } from './UpdateMeetupCommand'

export class UpdateMeetupCommandHandler
  implements CommandHandler<UpdateMeetupCommand>
{
  constructor(private updater: MeetupUpdater) {}

  subscribedTo(): Command {
    return UpdateMeetupCommand
  }

  async handle(command: UpdateMeetupCommand): Promise<void> {
    await this.updater.run({
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
        : undefined,
      attendees: command.attendees
        ? command.attendees.map(id => new UserId(id))
        : undefined
    })
  }
}
