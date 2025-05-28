import { ValidationError } from './ValidationError'

export class NotNullError extends ValidationError {
  constructor(value: string) {
    super(`Value must not be null: ${value}`)
  }
}
