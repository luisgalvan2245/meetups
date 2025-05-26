import { Command } from '../../../Shared/domain/bus/CommandBus/Command'
import { CommandHandler } from '../../../Shared/domain/bus/CommandBus/CommandHandler'
import { UserId } from '../../../Shared/domain/value-objects/UserId'
import { UserEmail } from '../../domain/value-objects/UserEmail'
import { UserName } from '../../domain/value-objects/UserName'
import { UserPassword } from '../../domain/value-objects/UserPassword'
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
