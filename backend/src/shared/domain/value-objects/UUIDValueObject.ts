import * as uuid from "uuid"
import { ValueObject } from "@/shared/domain/value-objects/ValueObject"
import { InvalidUUIDError } from "@/shared/domain/errors/InvalidUUIDError"

export class UUIDValueObject extends ValueObject<string> {
  constructor(value: string) {
    super(value)
    this.assertIsValidUuid(value)
  }

  static create(id?: string): UUIDValueObject {
    if (id) {
      return new UUIDValueObject(id)
    }
    return new UUIDValueObject(uuid.v4())
  }

  static random(): UUIDValueObject {
    return new UUIDValueObject(uuid.v4())
  }

  private assertIsValidUuid(id: string): void {
    if (!uuid.validate(id)) {
      throw new InvalidUUIDError(`Invalid UUID format: ${id}`)
    }
  }
}
