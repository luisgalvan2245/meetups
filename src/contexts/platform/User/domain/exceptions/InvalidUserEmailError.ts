import { BusinessRuleError } from '../../../Shared/domain/exceptions/BusinessRuleError'

export class InvalidUserEmailError extends BusinessRuleError {
  constructor(message: string) {
    super(message)
  }
}
