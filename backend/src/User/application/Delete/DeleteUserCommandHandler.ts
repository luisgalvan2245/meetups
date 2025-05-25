import { UserId } from 'src/Shared/domain/ValueObjects/UserId'

import { Command } from '../../../Shared/domain/Bus/CommandBus/Command'
import { CommandHandler } from '../../../Shared/domain/Bus/CommandBus/CommandHandler'
import { DeleteUserCommand } from './DeleteUserCommand'
import { UserDeleter } from './UserDeleter'

export class DeleteUserCommandHandler
  implements CommandHandler<DeleteUserCommand>
{
  constructor(private deleter: UserDeleter) {}

  subscribedTo(): Command {
    return DeleteUserCommand
  }

  async handle(command: DeleteUserCommand): Promise<void> {
    await this.deleter.run(new UserId(command.id))
  }
}
