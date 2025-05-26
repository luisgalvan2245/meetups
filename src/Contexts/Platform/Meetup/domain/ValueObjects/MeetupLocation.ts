import { StringLengthExceededError } from '../../../Shared/domain/Exceptions/StringLengthExceededError'
import { StringValueObject } from '../../../Shared/domain/ValueObjects/StringValueObject'

export class MeetupLocation extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.assertLengthIsLessThan(200)
  }

  private assertLengthIsLessThan(maxLength: number): void {
    if (this.value.length > maxLength) {
      throw new StringLengthExceededError(this.value, maxLength)
    }
  }
}
