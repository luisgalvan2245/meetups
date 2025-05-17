export class MeetupTitle {
  private constructor(private readonly value: string) {}

  public static create(title: string): MeetupTitle {
    if (!title || title.trim().length === 0) {
      throw new Error("Title cannot be empty")
    }
    return new MeetupTitle(title)
  }

  public getValue(): string {
    return this.value
  }
}
