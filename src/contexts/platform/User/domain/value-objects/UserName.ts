import { StringValueObject } from '../../../shared/domain/value-objects/StringValueObject'
import { InvalidUserNameError } from '../exceptions/InvalidUserNameError'

export class UserName extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.assertIsValidName(value)
  }

  private assertIsValidName(value: string): void {
    if (value.length < 2) {
      throw new InvalidUserNameError('Name must be at least 2 characters long')
    }
    if (value.length > 50) {
      throw new InvalidUserNameError(
        'Name must be less than 50 characters long'
      )
    }
  }
}
