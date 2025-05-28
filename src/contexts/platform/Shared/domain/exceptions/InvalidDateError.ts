import { ValidationError } from './ValidationError'

export class InvalidDateError extends ValidationError {
  constructor(date: Date) {
    super(`Invalid date: ${date}`)
  }
}
