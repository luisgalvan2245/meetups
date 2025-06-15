import { NotFoundError } from '../../../shared/domain/exceptions/NotFoundError'

export class TicketNotFoundError extends NotFoundError {
  constructor(id: string) {
    super(`The ticket with id <${id}> has not been found`)
  }
}
