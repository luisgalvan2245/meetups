import { InvalidDateError } from '../../../shared/domain/exceptions/InvalidDateError'
import { DateValueObject } from '../../../shared/domain/value-objects/DateValueObject'

export class MeetupDate extends DateValueObject {
  constructor(value: Date) {
    super(value)
    this.assertIsValidDate()
  }

  private assertIsValidDate(): void {
    if (isNaN(this.value.getTime())) {
      throw new InvalidDateError(this.value)
    }
  }

  toString(): string {
    return this.value.toISOString()
  }
}
