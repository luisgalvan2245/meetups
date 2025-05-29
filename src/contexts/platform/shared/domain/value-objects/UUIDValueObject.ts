// NOTE: We are using an external library in the domain layer (be aware of the risks).
import { validate as uuidValidate } from 'uuid'

import { InvalidUUIDError } from '../exceptions/InvalidUUIDError'
import { ValueObject } from './ValueObject'

export class UUIDValueObject extends ValueObject<string> {
  constructor(value: string) {
    super(value)
    this.assertIsValidUUID(value)
  }

  static create(id: string): UUIDValueObject {
    return new UUIDValueObject(id)
  }

  static random(): UUIDValueObject {
    return new UUIDValueObject(crypto.randomUUID())
  }

  private assertIsValidUUID(id: string): void {
    if (!uuidValidate(id)) {
      throw new InvalidUUIDError(id)
    }
  }
}
