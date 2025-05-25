import { Command } from '../../../Shared/domain/Bus/CommandBus/Command'
import { CommandHandler } from '../../../Shared/domain/Bus/CommandBus/CommandHandler'
import { UserId } from '../../../Shared/domain/ValueObjects/UserId'
import { UserEmail } from '../../domain/ValueObjects/UserEmail'
import { UserName } from '../../domain/ValueObjects/UserName'
import { UserPassword } from '../../domain/ValueObjects/UserPassword'
import { CreateUserCommand } from './CreateUserCommand'
import { UserCreator } from './UserCreator'

export class CreateUserCommandHandler
  implements CommandHandler<CreateUserCommand>
{
  constructor(private creator: UserCreator) {}
  subscribedTo(): Command {
    return CreateUserCommand
  }

  async handle(command: CreateUserCommand): Promise<void> {
    await this.creator.run({
      id: new UserId(command.id),
      name: new UserName(command.name),
      email: new UserEmail(command.email),
      password: new UserPassword(command.password)
    })
  }
}
