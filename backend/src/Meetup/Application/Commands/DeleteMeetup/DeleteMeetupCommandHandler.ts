import { CommandHandler } from "../../../../Shared/domain/CommandHandler"
import { Command } from "../../../../Shared/Domain/Command"
import { DeleteMeetupCommand } from "./DeleteMeetupCommand"
import { MeetupDeleter } from "../../../application/Delete/MeetupDeleter"
import { MeetupId } from "../../../../Shared/domain/value-objects/MeetupId"

export class DeleteMeetupCommandHandler
  implements CommandHandler<DeleteMeetupCommand>
{
  constructor(private meetupDeleter: MeetupDeleter) {}

  subscribedTo(): Command {
    return DeleteMeetupCommand
  }

  async handle(command: DeleteMeetupCommand): Promise<void> {
    await this.meetupDeleter.run(new MeetupId(command.id))
  }
}
