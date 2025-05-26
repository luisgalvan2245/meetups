import { BusinessRuleError } from '../../../Shared/domain/Exceptions/BusinessRuleError'

export class InvalidUserEmailError extends BusinessRuleError {
  constructor(message: string) {
    super(message)
  }
}
