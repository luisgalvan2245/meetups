import { Command } from '../../../shared/domain/command/Command'
import { CommandHandler } from '../../../shared/domain/command/CommandHandler'
import { TicketDescription } from '../../domain/value-objects/TicketDescription'
import { TicketId } from '../../domain/value-objects/TicketId'
import { CreateTicketCommand } from './CreateTicketCommand'
import { TicketCreator } from './TicketCreator'

export class CreateTicketCommandHandler
  implements CommandHandler<CreateTicketCommand>
{
  constructor(private creator: TicketCreator) {}

  subscribedTo(): Command {
    return CreateTicketCommand
  }

  async handle(command: CreateTicketCommand): Promise<void> {
    await this.creator.run({
      id: new TicketId(command.id),
      description: new TicketDescription(command.description)
    })
  }
}
