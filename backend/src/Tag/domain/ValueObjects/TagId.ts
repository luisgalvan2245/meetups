import { UUIDValueObject } from '../../../Shared/domain/ValueObjects/UUIDValueObject'

export class TagId extends UUIDValueObject {
  constructor(value: string) {
    super(value)
  }

  // The static random method can be inherited from UUIDValueObject if it behaves the same,
  // or overridden if specific logic for TagId.random() is needed.
  // For now, let's assume the inherited one is fine or it will be added if missing.
}
