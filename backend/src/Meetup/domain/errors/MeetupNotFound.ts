import { NotFoundError } from "../../../Shared/domain/errors/NotFoundError"

export class MeetupNotFound extends NotFoundError {
  constructor(meetupId: string) {
    super(meetupId)
  }

  protected resourceType(): string {
    return "meetup"
  }
}
