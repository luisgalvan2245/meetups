import { Command } from '../../../Shared/domain/bus/CommandBus/Command'
import { CommandHandler } from '../../../Shared/domain/bus/CommandBus/CommandHandler'
import { UserId } from '../../../Shared/domain/value-objects/UserId'
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
