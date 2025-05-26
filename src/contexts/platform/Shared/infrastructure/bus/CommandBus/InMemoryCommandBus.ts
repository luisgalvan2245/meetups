import { Command } from '../../../domain/bus/CommandBus/Command'
import { CommandBus } from '../../../domain/bus/CommandBus/CommandBus'
import { CommandHandlers } from './CommandHandlers'

export class InMemoryCommandBus implements CommandBus {
  constructor(private commandHandlers: CommandHandlers) {}

  async dispatch(command: Command): Promise<void> {
    const handler = this.commandHandlers.get(command)

    await handler.handle(command)
  }
}
