import { BusinessRuleError } from '../../../Shared/domain/exceptions/BusinessRuleError'

export class InvalidUserNameError extends BusinessRuleError {
  constructor(message: string) {
    super(message)
  }
}
