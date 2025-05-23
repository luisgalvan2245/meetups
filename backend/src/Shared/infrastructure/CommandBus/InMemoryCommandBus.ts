import { Command } from "../../domain/Bus/CommandBus/Command"
import { CommandBus } from "../../domain/Bus/CommandBus/CommandBus"
import { CommandHandlers } from "./CommandHandlers"

export class InMemoryCommandBus implements CommandBus {
  constructor(private commandHandlers: CommandHandlers) {}

  async dispatch(command: Command): Promise<void> {
    const handler = this.commandHandlers.get(command)

    await handler.handle(command)
  }
}
