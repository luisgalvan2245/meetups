import { Command } from '../../../shared/domain/command/Command'
import { CommandHandler } from '../../../shared/domain/command/CommandHandler'
import { TicketDescription } from '../../domain/value-objects/TicketDescription'
import { TicketId } from '../../domain/value-objects/TicketId'
import { TicketUpdater } from './TicketUpdater'
import { UpdateTicketCommand } from './UpdateTicketCommand'

export class UpdateTicketCommandHandler
  implements CommandHandler<UpdateTicketCommand>
{
  constructor(private updater: TicketUpdater) {}

  subscribedTo(): Command {
    return UpdateTicketCommand
  }

  async handle(command: UpdateTicketCommand): Promise<void> {
    await this.updater.run({
      id: new TicketId(command.id),
      description: command.description
        ? new TicketDescription(command.description)
        : undefined
    })
  }
}
