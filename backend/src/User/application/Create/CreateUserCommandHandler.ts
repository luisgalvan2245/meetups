import { Command } from '../../../Shared/domain/Bus/CommandBus/Command'
import { CommandHandler } from '../../../Shared/domain/Bus/CommandBus/CommandHandler'
import { CreateUser } from './CreateUser'
import { CreateUserCommand } from './CreateUserCommand'

export class CreateUserCommandHandler
  implements CommandHandler<CreateUserCommand>
{
  constructor(private creator: CreateUser) {}
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
