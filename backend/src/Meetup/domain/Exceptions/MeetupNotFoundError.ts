import { NotFoundError } from "../../../Shared/domain/Exceptions/NotFoundError"

export class MeetupNotFoundError extends NotFoundError {
  constructor(meetupId: string) {
    super(meetupId)
  }

  protected resourceType(): string {
    return "meetup"
  }
}
