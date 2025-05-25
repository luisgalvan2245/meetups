import { BusinessRuleError } from '../../../Shared/domain/Exceptions/BusinessRuleError'

export class InvalidUserRoleError extends BusinessRuleError {
  constructor(message: string) {
    super(message)
  }
}
