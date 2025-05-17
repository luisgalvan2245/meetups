import { ValueObject } from "@/shared/domain/value-objects/value-object"

export class MeetupImageUrl extends ValueObject<string> {
  constructor(value: string) {
    super(value)
  }

  static create(value: string): MeetupImageUrl {
    if (!value || value.trim().length === 0) {
      throw new Error("La URL de la imagen no puede estar vacía")
    }
    // Validación simple de URL
    try {
      new URL(value)
    } catch {
      throw new Error("La URL de la imagen no es válida")
    }
    return new MeetupImageUrl(value.trim())
  }

  public getValue(): string {
    return this.value
  }
}
