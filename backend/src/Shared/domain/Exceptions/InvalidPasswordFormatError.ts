import { FormatError } from './FormatError'

export class InvalidPasswordFormatError extends FormatError {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidPasswordFormatError'
  }
}
