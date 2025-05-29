import { Command } from '../../../shared/domain/command/Command'
import { CommandHandler } from '../../../shared/domain/command/CommandHandler'
import { MeetupId } from '../../domain/value-objects/MeetupId'
import { DeleteMeetupCommand } from './DeleteMeetupCommand'
import { MeetupDeleter } from './MeetupDeleter'

export class DeleteMeetupCommandHandler
  implements CommandHandler<DeleteMeetupCommand>
{
  constructor(private deleter: MeetupDeleter) {}

  subscribedTo(): Command {
    return DeleteMeetupCommand
  }

  async handle(command: DeleteMeetupCommand): Promise<void> {
    await this.deleter.run(new MeetupId(command.id))
  }
}
