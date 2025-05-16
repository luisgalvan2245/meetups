import { ValueObject } from "./valueObject"

export class EntityId extends ValueObject<string> {
  constructor(value: string) {
    super(value)
  }

  static create(value: string): EntityId {
    return new EntityId(value)
  }
}
