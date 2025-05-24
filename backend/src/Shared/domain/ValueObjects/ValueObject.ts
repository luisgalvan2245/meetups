import { NotNullError } from '../Exceptions/NotNullError'

export type Primitives = string | number | boolean | Date

export abstract class ValueObject<T extends Primitives> {
  readonly value: T

  constructor(value: T) {
    this.value = value
    this.assertValueIsDefined()
  }

  private assertValueIsDefined(): void {
    if (this.value === null || this.value === undefined) {
      throw new NotNullError('Value must be defined')
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
