import { MeetupDateInvalidFormat } from "@/meetup/domain/errors/MeetupDateInvalidFormat"
import { DateValueObject } from "@/shared/domain/value-objects/DateValueObject"

export class MeetupDate extends DateValueObject {
  constructor(value: Date) {
    super(value)
    this.assertIsValidDate()
  }

  private assertIsValidDate(): void {
    if (isNaN(this.value.getTime())) {
      throw new MeetupDateInvalidFormat(
        `The Meetup Date <${this.value}> is not a valid date`
      )
    }
  }
}
