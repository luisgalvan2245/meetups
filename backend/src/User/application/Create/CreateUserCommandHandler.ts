import { Command } from '../../../Shared/domain/Bus/CommandBus/Command'
import { CommandHandler } from '../../../Shared/domain/Bus/CommandBus/CommandHandler'
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
      name: command.name,
      email: command.email,
      password: command.password
    })
  }
}
