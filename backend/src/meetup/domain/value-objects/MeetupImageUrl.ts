export class MeetupImageUrl {
  private constructor(private readonly value: string) {}

  public static create(imageUrl: string): MeetupImageUrl {
    if (!imageUrl || imageUrl.trim().length === 0) {
      throw new Error("Image URL cannot be empty")
    }
    try {
      new URL(imageUrl)
    } catch {
      throw new Error("Invalid image URL")
    }
    return new MeetupImageUrl(imageUrl)
  }

  public getValue(): string {
    return this.value
  }
}
