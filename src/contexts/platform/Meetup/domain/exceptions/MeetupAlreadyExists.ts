import { AlreadyExistsError } from '../../../Shared/domain/exceptions/AlreadyExistsError'

export class MeetupAlreadyExists extends AlreadyExistsError {
  constructor(id: string) {
    super(`The meetup with id <${id}> already exists`)
  }
}
