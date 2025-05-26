import { ValueObject } from './ValueObject'

export abstract class StringValueObject extends ValueObject<string> {
  constructor(value: string) {
    super(value)
  }

  equals(other: StringValueObject): boolean {
    return this.value === other.value
  }

  toString(): string {
    return this.value
  }
}
