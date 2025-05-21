import { MeetupDateInvalidFormat } from "../../Domain/Exceptions/MeetupDateInvalidFormat"
import { DateValueObject } from "../../../Shared/domain/value-objects/DateValueObject"

export class MeetupDate extends DateValueObject {
  constructor(value: Date) {
    super(value)
    this.assertIsValidDate()
  }

  private assertIsValidDate(): void {
    if (isNaN(this.value.getTime())) {
      const msg = `The Meetup Date <${this.value}> is not a valid date`
      throw new MeetupDateInvalidFormat(msg)
    }
  }
}
