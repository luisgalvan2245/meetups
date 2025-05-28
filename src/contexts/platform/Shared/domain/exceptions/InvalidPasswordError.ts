import { BusinessRuleError } from './BusinessRuleError'

export class InvalidPasswordError extends BusinessRuleError {
  constructor(password: string) {
    super(`Invalid password: ${password}`)
  }
}
