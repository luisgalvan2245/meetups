export class MeetupLocation {
  private constructor(private readonly value: string) {}

  public static create(location: string): MeetupLocation {
    if (!location || location.trim().length === 0) {
      throw new Error("Location cannot be empty")
    }
    return new MeetupLocation(location)
  }

  public getValue(): string {
    return this.value
  }
}
