import { ValueObject } from "@/shared/domain/valueObjects/valueObject"

export class MeetupUpdatedAt extends ValueObject<Date> {
  constructor(value: Date) {
    super(value)
  }

  static create(value: Date): MeetupUpdatedAt {
    return new MeetupUpdatedAt(value)
  }
}
