import { StringValueObject } from "@/shared/domain/value-objects/StringValueObject"

export class MeetupTitle extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.ensureLengthIsLessThan(100)
  }

  private ensureLengthIsLessThan(maxLength: number): void {
    if (this.value.length > maxLength) {
      throw new Error(
        `The Meetup Title <${this.value}> has more than ${maxLength} characters`
      )
    }
  }
}
