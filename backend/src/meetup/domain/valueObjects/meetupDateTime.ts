export class MeetupDateTime {
  private constructor(private readonly value: Date) {}

  public static create(date?: string | Date): MeetupDateTime {
    const parsedDate = date ? new Date(date) : new Date()
    if (isNaN(parsedDate.getTime())) {
      throw new Error("La fecha no es válida")
    }
    return new MeetupDateTime(parsedDate)
  }

  public getValue(): Date {
    return this.value
  }

  public toISOString(): string {
    return this.value.toISOString()
  }
}
