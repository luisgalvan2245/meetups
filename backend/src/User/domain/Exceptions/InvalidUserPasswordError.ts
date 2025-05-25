import { BusinessRuleError } from '../../../Shared/domain/Exceptions/BusinessRuleError'

export class InvalidUserPasswordError extends BusinessRuleError {
  constructor(message: string) {
    super(message)
  }
}
