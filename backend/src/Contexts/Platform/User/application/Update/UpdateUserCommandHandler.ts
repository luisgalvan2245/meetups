import { Command } from '../../../Shared/domain/Bus/CommandBus/Command'
import { CommandHandler } from '../../../Shared/domain/Bus/CommandBus/CommandHandler'
import { UserId } from '../../../Shared/domain/ValueObjects/UserId'
import { UserEmail } from '../../../User/domain/ValueObjects/UserEmail'
import { UserName } from '../../../User/domain/ValueObjects/UserName'
import { UserPassword } from '../../../User/domain/ValueObjects/UserPassword'
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
