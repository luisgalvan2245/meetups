import { v4 as uuidV4 } from 'uuid'

import { NotNullError } from '../../../Shared/domain/Exceptions/NotNullError'
import { UUIDValueObject } from '../../../Shared/domain/ValueObjects/UUIDValueObject'

export class UserId extends UUIDValueObject {
  constructor(value: string) {
    super(value)
  }

  static generate(): UserId {
    return new UserId(uuidV4())
  }

  static create(value: string): UserId {
    if (!value) {
      throw new NotNullError('User ID cannot be empty')
    }
    return new UserId(value)
  }
}
