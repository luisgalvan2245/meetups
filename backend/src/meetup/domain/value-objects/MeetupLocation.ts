import { MeetupLocationLengthExceeded } from "../errors/MeetupLocationLengthExceeded"
import { StringValueObject } from "../../../shared/domain/value-objects/StringValueObject"

export class MeetupLocation extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.assertLengthIsLessThan(200)
  }

  private assertLengthIsLessThan(maxLength: number): void {
    if (this.value.length > maxLength) {
      throw new MeetupLocationLengthExceeded(
        `The Meetup Location <${this.value}> has more than ${maxLength} characters`
      )
    }
  }
}
