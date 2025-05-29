import { InvalidArgumentError } from '../../../Shared/domain/exceptions/InvalidArgumentError'

export class InvalidUserPasswordError extends InvalidArgumentError {
  constructor(message: string) {
    super(message)
  }
}
