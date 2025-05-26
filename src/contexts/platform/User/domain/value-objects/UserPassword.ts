import { StringValueObject } from '../../../Shared/domain/value-objects/StringValueObject'
import { InvalidUserPasswordError } from '../exceptions/InvalidUserPasswordError'

export class UserPassword extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.assertIsValidPassword(value)
  }

  private assertIsValidPassword(value: string): void {
    if (value.length < 8) {
      throw new InvalidUserPasswordError(
        'Password must be at least 8 characters long'
      )
    }
    if (value.length > 100) {
      throw new InvalidUserPasswordError(
        'Password must be less than 100 characters long'
      )
    }
    // At least one uppercase letter, one lowercase letter, one number and one special character
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if (!regex.test(value)) {
      throw new InvalidUserPasswordError(
        'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
      )
    }
  }
}
