import { StringValueObject } from '../../../Shared/domain/ValueObjects/StringValueObject'
import { InvalidUserRoleError } from '../Exceptions/InvalidUserRoleError'

export class UserRole extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.ensureValidRole(value)
  }

  private ensureValidRole(value: string): void {
    if (!['USER', 'ADMIN'].includes(value)) {
      throw new InvalidUserRoleError(`Invalid user role: ${value}`)
    }
  }

  static USER(): UserRole {
    return new UserRole('USER')
  }

  static ADMIN(): UserRole {
    return new UserRole('ADMIN')
  }
}
