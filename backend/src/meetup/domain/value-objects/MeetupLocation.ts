import { StringValueObject } from "@/shared/domain/value-objects/StringValueObject"

export class MeetupLocation extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.ensureLengthIsLessThan(200)
  }

  private ensureLengthIsLessThan(maxLength: number): void {
    if (this.value.length > maxLength) {
      throw new Error(
        `The Meetup Location <${this.value}> has more than ${maxLength} characters`
      )
    }
  }
}
