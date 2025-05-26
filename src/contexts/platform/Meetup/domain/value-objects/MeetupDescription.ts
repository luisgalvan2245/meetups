import { StringLengthExceededError } from '../../../Shared/domain/exceptions/StringLengthExceededError'
import { StringValueObject } from '../../../Shared/domain/value-objects/StringValueObject'

export class MeetupDescription extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.assertLengthIsLessThan(500)
  }

  private assertLengthIsLessThan(maxLength: number): void {
    if (this.value.length > maxLength) {
      throw new StringLengthExceededError(this.value, maxLength)
    }
  }
}
