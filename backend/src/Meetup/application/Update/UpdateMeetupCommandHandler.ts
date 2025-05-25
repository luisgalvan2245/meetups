import { Command } from '../../../Shared/domain/Bus/CommandBus/Command'
import { CommandHandler } from '../../../Shared/domain/Bus/CommandBus/CommandHandler'
import { UserId } from '../../../Shared/domain/ValueObjects/UserId'
import { TagId } from '../../../Tag/domain/ValueObjects/TagId'
import { MeetupDate } from '../../domain/ValueObjects/MeetupDate'
import { MeetupDescription } from '../../domain/ValueObjects/MeetupDescription'
import { MeetupId } from '../../domain/ValueObjects/MeetupId'
import { MeetupImageUrl } from '../../domain/ValueObjects/MeetupImageUrl'
import { MeetupLocation } from '../../domain/ValueObjects/MeetupLocation'
import { MeetupTitle } from '../../domain/ValueObjects/MeetupTitle'
import { UpdateMeetup } from './MeetupUpdater'
import { UpdateMeetupCommand } from './UpdateMeetupCommand'

export class UpdateMeetupCommandHandler
  implements CommandHandler<UpdateMeetupCommand>
{
  constructor(private updater: UpdateMeetup) {}

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
        : undefined,
      tags: command.tags ? command.tags.map(id => new TagId(id)) : undefined
    })
  }
}
