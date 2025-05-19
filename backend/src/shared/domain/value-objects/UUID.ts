import { v4 as uuidv4, validate as uuidValidate } from "uuid"
import { ValueObject } from "@/shared/domain/value-objects/ValueObject"

export class UUID extends ValueObject<string> {
  constructor(value: string) {
    super(value)
    this.assertIsValidUuid(value)
  }

  static create(id?: string): UUID {
    if (id) {
      return new UUID(id)
    }
    return new UUID(uuidv4())
  }

  static random(): UUID {
    return new UUID(uuidv4())
  }

  private assertIsValidUuid(id: string): void {
    if (!uuidValidate(id)) {
      throw new Error(
        `<${this.constructor.name}> does not allow the invalid uuid format: ${id}`
      )
    }
  }
}
