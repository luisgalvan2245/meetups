import { DateValueObject } from "@/shared/domain/value-objects/DateValueObject"

export class MeetupDate extends DateValueObject {
  constructor(value: Date) {
    super(value)
    this.ensureIsFutureDate()
  }

  private ensureIsFutureDate(): void {
    if (this.value < new Date()) {
      throw new Error(`The Meetup Date <${this.value}> must be a future date`)
    }
  }
}
