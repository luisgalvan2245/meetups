// NOTE: We are using an external library in the domain layer (be aware of the risks).
import { v4 as uuidV4, validate as uuidValidate } from 'uuid'

import { InvalidUUIDFormatError } from '../exceptions/InvalidUUIDFormatError'
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
    return new UUIDValueObject(uuidV4())
  }

  private assertIsValidUUID(id: string): void {
    if (!uuidValidate(id)) {
      throw new InvalidUUIDFormatError(`Invalid UUID format: ${id}`)
    }
  }
}
