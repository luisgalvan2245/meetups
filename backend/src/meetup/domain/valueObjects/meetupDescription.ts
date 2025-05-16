import { ValueObject } from "@/shared/domain/valueObjects/valueObject"

export class MeetupDescription extends ValueObject<string> {
  constructor(value: string) {
    super(value)
  }

  static create(value: string): MeetupDescription {
    if (!value || value.trim().length === 0) {
      throw new Error("La descripción no puede estar vacía")
    }
    if (value.length > 500) {
      throw new Error("La descripción no puede tener más de 500 caracteres")
    }
    return new MeetupDescription(value.trim())
  }

  public getValue(): string {
    return this.value
  }
}
