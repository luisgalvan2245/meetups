import { Command } from '../../../shared/domain/command/Command'
import { CommandHandler } from '../../../shared/domain/command/CommandHandler'
import { TicketId } from '../../domain/value-objects/TicketId'
import { DeleteTicketCommand } from './DeleteTicketCommand'
import { TicketDeleter } from './TicketDeleter'

export class DeleteTicketCommandHandler
  implements CommandHandler<DeleteTicketCommand>
{
  constructor(private deleter: TicketDeleter) {}

  subscribedTo(): Command {
    return DeleteTicketCommand
  }

  async handle(command: DeleteTicketCommand): Promise<void> {
    await this.deleter.run(new TicketId(command.id))
  }
}
