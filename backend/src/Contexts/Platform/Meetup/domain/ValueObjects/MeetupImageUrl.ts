import { InvalidURLFormatError } from '../../../Shared/domain/Exceptions/InvalidURLFormatError'
import { StringValueObject } from '../../../Shared/domain/ValueObjects/StringValueObject'

export class MeetupImageUrl extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.assertIsValidUrl()
  }

  private assertIsValidUrl(): void {
    if (!URL.canParse(this.value)) {
      throw new InvalidURLFormatError(this.value)
    }
  }
}
