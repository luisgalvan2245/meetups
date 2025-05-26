import { UUIDValueObject } from '../../../Shared/domain/value-objects/UUIDValueObject'

export class MeetupId extends UUIDValueObject {
  constructor(value: string) {
    super(value)
  }
}
