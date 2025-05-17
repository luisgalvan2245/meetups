import { ValueObject } from "@/shared/domain/value-objects/value-object"

export class MeetupUpdatedAt extends ValueObject<Date> {
  constructor(value: Date) {
    super(value)
  }

  static create(value: Date): MeetupUpdatedAt {
    return new MeetupUpdatedAt(value)
  }
}
