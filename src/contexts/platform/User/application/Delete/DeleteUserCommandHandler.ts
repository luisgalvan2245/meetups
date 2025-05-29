import { Command } from '../../../shared/domain/command/Command'
import { CommandHandler } from '../../../shared/domain/command/CommandHandler'
import { UserId } from '../../../shared/domain/value-objects/UserId'
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
