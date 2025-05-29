import { InvalidArgumentError } from '../../../shared/domain/exceptions/InvalidArgumentError'

export class InvalidUserEmailError extends InvalidArgumentError {
  constructor(message: string) {
    super(message)
  }
}
