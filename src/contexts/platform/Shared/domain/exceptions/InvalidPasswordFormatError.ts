import { ValidationError } from './ValidationError'

export class InvalidPasswordFormatError extends ValidationError {
  constructor(message: string) {
    super(message)
  }
}
