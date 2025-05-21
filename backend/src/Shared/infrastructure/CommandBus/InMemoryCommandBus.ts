import { Command } from "../../domain/Command"
import { CommandBus } from "../../domain/CommandBus"
import { CommandHandlers } from "../CommandBus/CommandHandlers"

export class InMemoryCommandBus implements CommandBus {
  constructor(private commandHandlers: CommandHandlers) {}

  async dispatch(command: Command): Promise<void> {
    const handler = this.commandHandlers.get(command)

    await handler.handle(command)
  }
}
