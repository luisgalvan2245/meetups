import { InvalidArgumentError } from './InvalidArgumentError'

export class NotNullError extends InvalidArgumentError {
  constructor(value: string) {
    super(`Value must not be null: ${value}`)
  }
}
