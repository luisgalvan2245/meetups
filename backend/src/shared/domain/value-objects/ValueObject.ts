import { InvalidValueError } from "@/shared/domain/errors/InvalidValueError"

export type Primitives = String | string | number | Boolean | boolean | Date

export abstract class ValueObject<T extends Primitives> {
  readonly value: T

  constructor(value: T) {
    this.value = value
    this.assertValueIsDefined(value)
  }

  private assertValueIsDefined(value: T): void {
    if (value === null || value === undefined) {
      throw new InvalidValueError("Value must be defined")
    }
  }

  equals(other: ValueObject<T>): boolean {
    return (
      other.constructor.name === this.constructor.name &&
      other.value === this.value
    )
  }

  toString(): string {
    return this.value.toString()
  }
}
