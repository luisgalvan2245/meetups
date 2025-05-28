import { ValidationError } from './ValidationError'

export class InvalidUUIDError extends ValidationError {
  constructor(uuid: string) {
    super(`Invalid UUID: ${uuid}`)
  }
}
