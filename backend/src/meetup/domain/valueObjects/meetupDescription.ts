export class MeetupDescription {
  private constructor(private readonly value: string) {}

  public static create(description: string): MeetupDescription {
    if (!description || description.trim().length === 0) {
      throw new Error("La descripción no puede estar vacía")
    }
    if (description.length > 500) {
      throw new Error("La descripción no puede tener más de 500 caracteres")
    }
    return new MeetupDescription(description.trim())
  }

  public getValue(): string {
    return this.value
  }
}
