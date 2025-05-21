import { MeetupDescriptionLengthExceeded } from "../../Domain/Exceptions/MeetupDescriptionLengthExceeded"
import { StringValueObject } from "../../../Shared/domain/value-objects/StringValueObject"

export class MeetupDescription extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.assertLengthIsLessThan(500)
  }

  private assertLengthIsLessThan(maxLength: number): void {
    if (this.value.length > maxLength) {
      const msg = `The Meetup Description <${this.value}> has more than ${maxLength} characters`
      throw new MeetupDescriptionLengthExceeded(msg)
    }
  }
}
