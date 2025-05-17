export class MeetupDescription {
  private constructor(private readonly value: string) {}

  public static create(description: string): MeetupDescription {
    if (!description || description.trim().length === 0) {
      throw new Error("Description cannot be empty")
    }
    return new MeetupDescription(description)
  }

  public getValue(): string {
    return this.value
  }
}
