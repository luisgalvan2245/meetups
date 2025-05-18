import { StringValueObject } from "@/shared/domain/value-objects/StringValueObject"

export class MeetupDescription extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.ensureLengthIsLessThan(500)
  }

  private ensureLengthIsLessThan(maxLength: number): void {
    if (this.value.length > maxLength) {
      throw new Error(
        `The Meetup Description <${this.value}> has more than ${maxLength} characters`
      )
    }
  }
}
