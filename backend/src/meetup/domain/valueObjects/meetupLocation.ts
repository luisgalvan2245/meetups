export class MeetupLocation {
  private constructor(private readonly value: string) {}

  public static create(location: string): MeetupLocation {
    if (!location || location.trim().length === 0) {
      throw new Error("La localización no puede estar vacía")
    }
    if (location.length > 200) {
      throw new Error("La localización no puede tener más de 200 caracteres")
    }
    return new MeetupLocation(location.trim())
  }

  public getValue(): string {
    return this.value
  }
}
