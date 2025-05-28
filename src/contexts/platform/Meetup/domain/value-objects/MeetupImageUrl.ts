import { InvalidURLError } from '../../../Shared/domain/exceptions/InvalidURLError'
import { StringValueObject } from '../../../Shared/domain/value-objects/StringValueObject'

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
