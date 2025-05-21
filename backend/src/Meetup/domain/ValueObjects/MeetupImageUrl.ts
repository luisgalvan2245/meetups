import { MeetupImageUrlInvalidFormat } from "../../domain/Exceptions/MeetupImageUrlInvalidFormat"
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
      const msg = `The Meetup Image URL <${this.value}> is not a valid URL`
      throw new MeetupImageUrlInvalidFormat(msg)
    }
  }
}
