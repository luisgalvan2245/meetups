import { ValueObject } from "@/shared/domain/value-objects/value-object"

export class MeetupCreatedAt extends ValueObject<Date> {
  constructor(value: Date) {
    super(value)
  }

  static create(value: Date): MeetupCreatedAt {
    return new MeetupCreatedAt(value)
  }
}
