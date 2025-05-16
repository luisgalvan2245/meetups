import { ValueObject } from "@/shared/domain/valueObjects/valueObject"

export class MeetupLocation extends ValueObject<string> {
  constructor(value: string) {
    super(value)
  }

  static create(value: string): MeetupLocation {
    if (!value || value.trim().length === 0) {
      throw new Error("La localización no puede estar vacía")
    }
    if (value.length > 200) {
      throw new Error("La localización no puede tener más de 200 caracteres")
    }
    return new MeetupLocation(value.trim())
  }

  public getValue(): string {
    return this.value
  }
}
