import { v4 as uuidv4, validate as uuidValidate } from "uuid"
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
    return new UUIDValueObject(uuidv4())
  }

  static random(): UUIDValueObject {
    return new UUIDValueObject(uuidv4())
  }

  private assertIsValidUuid(id: string): void {
    if (!uuidValidate(id)) {
      throw new InvalidUUIDError(`Invalid UUID format: ${id}`)
    }
  }
}
