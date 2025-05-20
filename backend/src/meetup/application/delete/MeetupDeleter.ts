import { MeetupRepository } from "../../domain/repositories/MeetupRepository"
import { MeetupFinder } from "../../domain/services/MeetupFinder"

export class MeetupDeleter {
  private finder: MeetupFinder

  constructor(private repository: MeetupRepository) {
    this.finder = new MeetupFinder(repository)
  }

  async run(id: string): Promise<void> {
    await this.finder.run(id)
    await this.repository.delete(id)
  }
}
