import { Command } from '../../../Shared/domain/Bus/CommandBus/Command'
import { CommandHandler } from '../../../Shared/domain/Bus/CommandBus/CommandHandler'
import { MeetupId } from '../../domain/ValueObjects/MeetupId'
import { DeleteMeetup } from './DeleteMeetup'
import { DeleteMeetupCommand } from './DeleteMeetupCommand'

export class DeleteMeetupCommandHandler
  implements CommandHandler<DeleteMeetupCommand>
{
  constructor(private deleter: DeleteMeetup) {}

  subscribedTo(): Command {
    return DeleteMeetupCommand
  }

  async handle(command: DeleteMeetupCommand): Promise<void> {
    await this.deleter.run(new MeetupId(command.id))
  }
}
