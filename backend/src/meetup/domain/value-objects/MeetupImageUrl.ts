import { MeetupImageUrlInvalidFormat } from "../errors/MeetupImageUrlInvalidFormat"
import { StringValueObject } from "../../../shared/domain/value-objects/StringValueObject"

export class MeetupImageUrl extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.assertIsValidUrl()
  }

  private assertIsValidUrl(): void {
    try {
      new URL(this.value)
    } catch (error) {
      throw new MeetupImageUrlInvalidFormat(
        `The Meetup Image URL <${this.value}> is not a valid URL`
      )
    }
  }
}
