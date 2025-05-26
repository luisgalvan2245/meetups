import { Command } from '../../../Shared/domain/Bus/CommandBus/Command'
import { CommandHandler } from '../../../Shared/domain/Bus/CommandBus/CommandHandler'
import { MeetupId } from '../../domain/ValueObjects/MeetupId'
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
