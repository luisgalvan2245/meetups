import { BusinessRuleError } from './BusinessRuleError'

export class StringLengthExceededError extends BusinessRuleError {
  constructor(value: string, maxLength: number) {
    super(`String length exceeded (${maxLength} characters): ${value}`)
  }
}
