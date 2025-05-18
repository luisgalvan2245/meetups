import { StringValueObject } from "@/shared/domain/value-objects/StringValueObject"

export class MeetupImageUrl extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.ensureIsValidUrl()
  }

  private ensureIsValidUrl(): void {
    try {
      new URL(this.value)
    } catch {
      throw new Error(`The Meetup Image URL <${this.value}> is not a valid URL`)
    }
  }
}
