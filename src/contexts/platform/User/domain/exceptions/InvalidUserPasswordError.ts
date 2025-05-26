import { BusinessRuleError } from '../../../Shared/domain/exceptions/BusinessRuleError'

export class InvalidUserPasswordError extends BusinessRuleError {
  constructor(message: string) {
    super(message)
  }
}
