import { Command } from "./Command"

// Definición de un tipo para un constructor de Command
export type CommandClass<C extends Command = Command> = new (
  ...args: any[]
) => C

export interface CommandHandler<T extends Command> {
  subscribedTo(): CommandClass<T>
  handle(command: T): Promise<void>
}
