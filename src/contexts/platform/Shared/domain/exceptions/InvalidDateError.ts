import { InvalidArgumentError } from './InvalidArgumentError'

export class InvalidDateError extends InvalidArgumentError {
  constructor(date: Date) {
    super(`Invalid date: ${date}`)
  }
}
