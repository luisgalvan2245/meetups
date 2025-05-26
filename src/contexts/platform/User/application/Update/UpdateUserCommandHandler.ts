import { Command } from '../../../Shared/domain/bus/CommandBus/Command'
import { CommandHandler } from '../../../Shared/domain/bus/CommandBus/CommandHandler'
import { UserId } from '../../../Shared/domain/value-objects/UserId'
import { UserEmail } from '../../../User/domain/value-objects/UserEmail'
import { UserName } from '../../../User/domain/value-objects/UserName'
import { UserPassword } from '../../../User/domain/value-objects/UserPassword'
import { UpdateUserCommand } from './UpdateUserCommand'
import { UserUpdater } from './UserUpdater'

export class UpdateUserCommandHandler
  implements CommandHandler<UpdateUserCommand>
{
  constructor(private updater: UserUpdater) {}

  subscribedTo(): Command {
    return UpdateUserCommand
  }

  async handle(command: UpdateUserCommand): Promise<void> {
    await this.updater.run({
      id: new UserId(command.id),
      name: command.name ? new UserName(command.name) : undefined,
      email: command.email ? new UserEmail(command.email) : undefined,
      password: command.password
        ? new UserPassword(command.password)
        : undefined
    })
  }
}
