import { UserEmail } from 'src/User/domain/ValueObjects/UserEmail'
import { UserName } from 'src/User/domain/ValueObjects/UserName'
import { UserPassword } from 'src/User/domain/ValueObjects/UserPassword'

import { Command } from '../../../Shared/domain/Bus/CommandBus/Command'
import { CommandHandler } from '../../../Shared/domain/Bus/CommandBus/CommandHandler'
import { UserId } from '../../../Shared/domain/ValueObjects/UserId'
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
