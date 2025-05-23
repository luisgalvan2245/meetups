import { CommandHandler } from '../../../Shared/domain/Bus/CommandBus/CommandHandler'
import { Command } from '../../../Shared/domain/Bus/CommandBus/Command'
import { DeleteMeetupCommand } from './DeleteMeetupCommand'
import { MeetupDeleter } from './MeetupDeleter'
import { MeetupId } from '../../domain/ValueObjects/MeetupId'

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
