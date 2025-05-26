import { InvalidURLFormatError } from '../../../Shared/domain/exceptions/InvalidURLFormatError'
import { StringValueObject } from '../../../Shared/domain/value-objects/StringValueObject'

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
