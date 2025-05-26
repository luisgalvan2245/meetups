import { InvalidDateFormatError } from '../../../Shared/domain/Exceptions/InvalidDateFormatError'
import { DateValueObject } from '../../../Shared/domain/ValueObjects/DateValueObject'

export class MeetupDate extends DateValueObject {
  constructor(value: Date) {
    super(value)
    this.assertIsValidDate()
  }

  private assertIsValidDate(): void {
    if (isNaN(this.value.getTime())) {
      throw new InvalidDateFormatError(this.value)
    }
  }

  toString(): string {
    return this.value.toISOString()
  }
}
