import { InvalidPasswordFormatError } from '../../../Shared/domain/Exceptions/InvalidPasswordFormatError'
import { StringLengthExceededError } from '../../../Shared/domain/Exceptions/StringLengthExceededError'
import { StringValueObject } from '../../../Shared/domain/ValueObjects/StringValueObject'

export class Password extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.assertLengthIsLessThan(100)
    this.assertValidPassword()
  }

  private assertLengthIsLessThan(maxLength: number): void {
    if (this.value.length > maxLength) {
      throw new StringLengthExceededError(this.value, maxLength)
    }
  }

  private assertValidPassword(): void {
    // Password must be at least 8 characters long and contain at least one number and one letter
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if (!passwordRegex.test(this.value)) {
      throw new InvalidPasswordFormatError(
        'Password must be at least 8 characters long and contain at least one number and one letter'
      )
    }
  }
}
