import { MeetupTitleDescriptionLengthExceeded } from "@/meetup/domain/errors/MeetupTitleDescriptionLengthExceeded"
import { StringValueObject } from "@/shared/domain/value-objects/StringValueObject"

export class MeetupTitle extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.assertLengthIsLessThan(100)
  }

  private assertLengthIsLessThan(maxLength: number): void {
    if (this.value.length > maxLength) {
      throw new MeetupTitleDescriptionLengthExceeded(
        `The Meetup Title <${this.value}> has more than ${maxLength} characters`
      )
    }
  }
}
