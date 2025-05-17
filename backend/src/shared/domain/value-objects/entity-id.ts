import { ValueObject } from "@/shared/domain/value-objects/value-object"

export class EntityId extends ValueObject<string> {
  constructor(value: string) {
    super(value)
  }

  static create(value: string): EntityId {
    return new EntityId(value)
  }
}
