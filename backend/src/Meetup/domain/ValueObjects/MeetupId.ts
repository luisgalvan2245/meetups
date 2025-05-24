import { UUIDValueObject } from '../../../Shared/domain/ValueObjects/UUIDValueObject'

export class MeetupId extends UUIDValueObject {
  constructor(value: string) {
    super(value)
  }
}
