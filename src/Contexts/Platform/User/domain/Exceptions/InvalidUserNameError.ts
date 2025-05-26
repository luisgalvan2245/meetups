import { BusinessRuleError } from '../../../Shared/domain/Exceptions/BusinessRuleError'

export class InvalidUserNameError extends BusinessRuleError {
  constructor(message: string) {
    super(message)
  }
}
