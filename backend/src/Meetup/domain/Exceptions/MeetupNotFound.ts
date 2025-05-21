import { NotFoundError } from "../../../Shared/domain/Exceptions/NotFoundError"

export class MeetupNotFound extends NotFoundError {
  constructor(meetupId: string) {
    super(meetupId)
  }

  protected resourceType(): string {
    return "meetup"
  }
}
