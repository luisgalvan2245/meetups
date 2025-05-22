import { MeetupLocationLengthExceededError } from "../Exceptions/MeetupLocationLengthExceededError"
import { StringValueObject } from "../../../Shared/domain/ValueObjects/StringValueObject"

export class MeetupLocation extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.assertLengthIsLessThan(200)
  }

  private assertLengthIsLessThan(maxLength: number): void {
    if (this.value.length > maxLength) {
      throw new MeetupLocationLengthExceededError(
        `The Meetup Location <${this.value}> has more than ${maxLength} characters`
      )
    }
  }
}
