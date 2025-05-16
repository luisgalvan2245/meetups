export class MeetupId {
  private constructor(private readonly value: string) {}

  public static create(id?: string): MeetupId {
    const value = id ?? crypto.randomUUID()
    if (!value || value.trim().length === 0) {
      throw new Error("El id no puede estar vacío")
    }
    return new MeetupId(value)
  }

  public getValue(): string {
    return this.value
  }
}
