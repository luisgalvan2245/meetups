import { InvalidArgumentError } from '../../../Shared/domain/exceptions/InvalidArgumentError'

export class InvalidUserNameError extends InvalidArgumentError {
  constructor(message: string) {
    super(message)
  }
}
