import { MeetupImageUrlInvalidFormatError } from "../Exceptions/MeetupImageUrlInvalidFormatError"
import { StringValueObject } from "../../../Shared/domain/ValueObjects/StringValueObject"

export class MeetupImageUrl extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.assertIsValidUrl()
  }

  private assertIsValidUrl(): void {
    try {
      new URL(this.value)
    } catch (error) {
      throw new MeetupImageUrlInvalidFormatError(
        `The Meetup Image URL <${this.value}> is not a valid URL`
      )
    }
  }
}
