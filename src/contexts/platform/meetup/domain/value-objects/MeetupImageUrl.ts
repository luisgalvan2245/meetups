import { InvalidURLError } from '../../../shared/domain/exceptions/InvalidURLError'
import { StringValueObject } from '../../../shared/domain/value-objects/StringValueObject'

export class MeetupImageUrl extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.assertIsValidUrl()
  }

  private assertIsValidUrl(): void {
    if (!URL.canParse(this.value)) {
      throw new InvalidURLError(this.value)
    }
  }
}
