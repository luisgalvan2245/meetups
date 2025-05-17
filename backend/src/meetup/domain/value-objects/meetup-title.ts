import { ValueObject } from "@/shared/domain/value-objects/value-object"

export class MeetupTitle extends ValueObject<string> {
  constructor(value: string) {
    super(value)
  }

  static create(value: string): MeetupTitle {
    return new MeetupTitle(value)
  }
}
