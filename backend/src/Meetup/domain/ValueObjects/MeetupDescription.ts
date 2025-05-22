import { MeetupDescriptionLengthExceededError } from "../Exceptions/MeetupDescriptionLengthExceededError"
import { StringValueObject } from "../../../Shared/domain/ValueObjects/StringValueObject"

export class MeetupDescription extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.assertLengthIsLessThan(500)
  }

  private assertLengthIsLessThan(maxLength: number): void {
    if (this.value.length > maxLength) {
      throw new MeetupDescriptionLengthExceededError(
        `The Meetup Description <${this.value}> has more than ${maxLength} characters`
      )
    }
  }
}
