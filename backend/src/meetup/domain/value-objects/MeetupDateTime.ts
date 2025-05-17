export class MeetupDateTime {
  private constructor(private readonly value: Date) {}

  public static create(date?: string | Date): MeetupDateTime {
    if (date) {
      const parsedDate = typeof date === "string" ? new Date(date) : date
      if (!(parsedDate instanceof Date) || isNaN(parsedDate.getTime())) {
        throw new Error("Invalid date")
      }
      return new MeetupDateTime(parsedDate)
    }
    return new MeetupDateTime(new Date())
  }

  public getValue(): Date {
    return this.value
  }

  public toISOString(): string {
    return this.value.toISOString()
  }
}
