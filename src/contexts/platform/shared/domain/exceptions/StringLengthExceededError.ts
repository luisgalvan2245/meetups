import { InvalidArgumentError } from './InvalidArgumentError'

export class StringLengthExceededError extends InvalidArgumentError {
  constructor(value: string, maxLength: number) {
    super(`String length exceeded (${maxLength} characters): ${value}`)
  }
}
