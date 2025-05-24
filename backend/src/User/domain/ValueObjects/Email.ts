import { StringLengthExceededError } from '../../../Shared/domain/Exceptions/StringLengthExceededError'
import { StringValueObject } from '../../../Shared/domain/ValueObjects/StringValueObject'

export class Email extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.assertLengthIsLessThan(255)
    this.assertValidEmail()
  }

  private assertLengthIsLessThan(maxLength: number): void {
    if (this.value.length > maxLength) {
      throw new StringLengthExceededError(this.value, maxLength)
    }
  }

  private assertValidEmail(): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(this.value)) {
      throw new Error('Invalid email format')
    }
  }
}
