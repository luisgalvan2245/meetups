import { UUIDValueObject } from './UUIDValueObject'

export abstract class Uuid extends UUIDValueObject {
  constructor(value: string) {
    super(value)
  }

  toString(): string {
    return this.value
  }
}
