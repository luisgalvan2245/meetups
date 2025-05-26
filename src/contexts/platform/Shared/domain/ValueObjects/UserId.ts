import { UUIDValueObject } from '../../../Shared/domain/ValueObjects/UUIDValueObject'

export class UserId extends UUIDValueObject {
  constructor(value: string) {
    super(value)
  }
}
