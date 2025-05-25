import { StringValueObject } from '../../../Shared/domain/ValueObjects/StringValueObject'
import { InvalidUserEmailError } from '../Exceptions/InvalidUserEmailError'

export class UserEmail extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.ensureIsValidEmail()
  }

  private ensureIsValidEmail(): void {
    if (!this.value) {
      throw new InvalidUserEmailError('Email cannot be empty')
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(this.value)) {
      throw new InvalidUserEmailError('Invalid email format')
    }
  }
}
