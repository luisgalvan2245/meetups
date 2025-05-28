import { BusinessRuleError } from './BusinessRuleError'

export class InvalidURLError extends BusinessRuleError {
  constructor(url: string) {
    super(`Invalid URL: ${url}`)
  }
}
