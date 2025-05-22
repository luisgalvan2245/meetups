import { MeetupTitleLengthExceededError } from "../Exceptions/MeetupTitleLengthExceededError"
import { StringValueObject } from "../../../Shared/domain/ValueObjects/StringValueObject"

export class MeetupTitle extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.assertLengthIsLessThan(100)
  }

  private assertLengthIsLessThan(maxLength: number): void {
    if (this.value.length > maxLength) {
      throw new MeetupTitleLengthExceededError(
        `The Meetup Title <${this.value}> has more than ${maxLength} characters`
      )
    }
  }
}
