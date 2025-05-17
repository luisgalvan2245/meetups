export class MeetupDate {
  private constructor(private readonly value: Date) {}

  public static create(date: Date): MeetupDate {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
      throw new Error("Invalid date")
    }
    return new MeetupDate(date)
  }

  public getValue(): Date {
    return this.value
  }

  public toISOString(): string {
    return this.value.toISOString()
  }
}
