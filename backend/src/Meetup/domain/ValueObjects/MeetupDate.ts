import { MeetupDateInvalidFormatError } from "../Exceptions/MeetupDateInvalidFormatError"
import { DateValueObject } from "../../../Shared/domain/ValueObjects/DateValueObject"

export class MeetupDate extends DateValueObject {
  constructor(value: Date) {
    super(value)
    this.assertIsValidDate()
  }

  private assertIsValidDate(): void {
    if (isNaN(this.value.getTime())) {
      const msg = `The Meetup Date <${this.value}> is not a valid date`
      throw new MeetupDateInvalidFormatError(msg)
    }
  }
}
