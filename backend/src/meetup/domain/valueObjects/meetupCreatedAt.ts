import { ValueObject } from "@/shared/domain/valueObjects/valueObject"

export class MeetupCreatedAt extends ValueObject<Date> {
  constructor(value: Date) {
    super(value)
  }

  static create(value: Date): MeetupCreatedAt {
    return new MeetupCreatedAt(value)
  }
}
