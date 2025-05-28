import { ValidationError } from './ValidationError'

export class StringLengthExceededError extends ValidationError {
  constructor(value: string, maxLength: number) {
    super(`String length exceeded (${maxLength} characters): ${value}`)
  }
}
