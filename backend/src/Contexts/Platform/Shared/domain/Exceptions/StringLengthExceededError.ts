import { FormatError } from './FormatError'

export class StringLengthExceededError extends FormatError {
  constructor(value: string, maxLength: number) {
    super(`String length exceeded (${maxLength} characters): ${value}`)
  }
}
