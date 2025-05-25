import { NotFoundError } from '../../../Shared/domain/Exceptions/NotFoundError'

export class UserNotFoundError extends NotFoundError {
  constructor(id: string) {
    super(`The user with id <${id}> has not been found`)
  }
}
