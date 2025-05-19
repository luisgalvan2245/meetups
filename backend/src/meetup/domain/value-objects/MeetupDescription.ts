import { MeetupDescriptionLengthExceeded } from "@/meetup/errors/MeetupDescriptionLengthExceeded"
import { StringValueObject } from "@/shared/domain/value-objects/StringValueObject"

export class MeetupDescription extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.assertLengthIsLessThan(500)
  }

  private assertLengthIsLessThan(maxLength: number): void {
    if (this.value.length > maxLength) {
      throw new MeetupDescriptionLengthExceeded(
        `The Meetup Description <${this.value}> has more than ${maxLength} characters`
      )
    }
  }
}
