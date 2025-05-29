import { StringLengthExceededError } from '../../../shared/domain/exceptions/StringLengthExceededError'
import { StringValueObject } from '../../../shared/domain/value-objects/StringValueObject'

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
