import { ValueObject } from "@/shared/domain/valueObjects/valueObject"

export class MeetupTitle extends ValueObject<string> {
  constructor(value: string) {
    super(value)
  }

  static create(value: string): MeetupTitle {
    return new MeetupTitle(value)
  }
}
