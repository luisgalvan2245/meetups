import { v4 as uuidv4, validate as uuidValidate } from "uuid"
import { ValueObject } from "@/shared/domain/value-objects/ValueObject"
import { InvalidUUIDError } from "@/shared/domain/errors/InvalidUUIDError"

export class UUIDValueObject extends ValueObject<string> {
  constructor(value: string) {
    super(value)
    this.assertIsValidUUID(value)
  }

  static create(id: string): UUIDValueObject {
    return new UUIDValueObject(id)
  }

  static random(): UUIDValueObject {
    return new UUIDValueObject(uuidv4())
  }

  private assertIsValidUUID(id: string): void {
    if (!uuidValidate(id)) {
      throw new InvalidUUIDError(`Invalid UUID format: ${id}`)
    }
  }
}
