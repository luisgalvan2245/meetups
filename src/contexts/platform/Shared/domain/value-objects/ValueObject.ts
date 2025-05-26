import { NotNullError } from '../exceptions/NotNullError'

export type Primitives = string | number | boolean | Date

export abstract class ValueObject<T> {
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
    return this.value === other.value
  }

  toString(): string {
    return String(this.value)
  }
}
