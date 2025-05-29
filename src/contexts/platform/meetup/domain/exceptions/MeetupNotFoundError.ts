import { NotFoundError } from '../../../shared/domain/exceptions/NotFoundError'

export class MeetupNotFoundError extends NotFoundError {
  constructor(id: string) {
    super(`The meetup with id <${id}> has not been found`)
  }
}
