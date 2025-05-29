import { InvalidArgumentError } from './InvalidArgumentError'

export class InvalidUUIDError extends InvalidArgumentError {
  constructor(uuid: string) {
    super(`Invalid UUID: ${uuid}`)
  }
}
