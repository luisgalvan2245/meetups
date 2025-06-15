import { AlreadyExistsError } from '../../../shared/domain/exceptions/AlreadyExistsError'

export class TicketAlreadyExists extends AlreadyExistsError {
  constructor(id: string) {
    super(`The ticket with id <${id}> already exists`)
  }
}
