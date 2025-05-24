import { StringLengthExceededError } from '../../../Shared/domain/Exceptions/StringLengthExceededError'
import { StringValueObject } from '../../../Shared/domain/ValueObjects/StringValueObject'

export class Username extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.assertLengthIsLessThan(50)
    this.assertValidFormat()
  }

  private assertLengthIsLessThan(maxLength: number): void {
    if (this.value.length > maxLength) {
      throw new StringLengthExceededError(this.value, maxLength)
    }
  }

  private assertValidFormat(): void {
    const usernameRegex = /^[a-zA-Z0-9_]+$/
    if (!usernameRegex.test(this.value)) {
      throw new Error(
        'Username can only contain letters, numbers and underscores'
      )
    }
  }
}
