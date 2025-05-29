import { StringValueObject } from '../../../shared/domain/value-objects/StringValueObject'
import { InvalidUserEmailError } from '../exceptions/InvalidUserEmailError'

export class UserEmail extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.assertIsValidEmail()
  }

  private assertIsValidEmail(): void {
    if (!this.value) {
      throw new InvalidUserEmailError('Email cannot be empty')
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(this.value)) {
      throw new InvalidUserEmailError('Invalid email format')
    }
  }
}
