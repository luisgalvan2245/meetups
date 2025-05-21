import { MeetupTitleLengthExceeded } from "../../Domain/Exceptions/MeetupTitleLengthExceeded"
import { StringValueObject } from "../../../Shared/Domain/ValueObjects/StringValueObject"

export class MeetupTitle extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.assertLengthIsLessThan(100)
  }

  private assertLengthIsLessThan(maxLength: number): void {
    if (this.value.length > maxLength) {
      const msg = `The Meetup Title <${this.value}> has more than ${maxLength} characters`
      throw new MeetupTitleLengthExceeded(msg)
    }
  }
}
