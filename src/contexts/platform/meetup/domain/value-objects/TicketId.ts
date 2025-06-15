import { UUIDValueObject } from '../../../shared/domain/value-objects/UUIDValueObject'

export class TicketId extends UUIDValueObject {
  constructor(value: string) {
    super(value)
  }
}
