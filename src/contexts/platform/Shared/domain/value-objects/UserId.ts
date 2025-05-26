import { UUIDValueObject } from '../../../Shared/domain/value-objects/UUIDValueObject'

export class UserId extends UUIDValueObject {
  constructor(value: string) {
    super(value)
  }
}
