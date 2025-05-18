import { v4 as uuidv4, validate as uuidValidate } from "uuid"
import { ValueObject } from "@/shared/domain/value-objects/ValueObject"

export class Uuid extends ValueObject<string> {
  constructor(value: string) {
    super(value)
    this.ensureIsValidUuid(value)
  }

  static create(id?: string): Uuid {
    if (id) {
      return new Uuid(id)
    }
    return new Uuid(uuidv4())
  }

  static random(): Uuid {
    return new Uuid(uuidv4())
  }

  private ensureIsValidUuid(id: string): void {
    if (!uuidValidate(id)) {
      throw new Error(
        `<${this.constructor.name}> does not allow the invalid uuid format: ${id}`
      )
    }
  }
}
