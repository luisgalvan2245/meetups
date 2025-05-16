export class MeetupTitle {
  private constructor(private readonly value: string) {}

  public static create(title: string): MeetupTitle {
    if (!title || title.trim().length === 0) {
      throw new Error("El título no puede estar vacío")
    }
    if (title.length > 100) {
      throw new Error("El título no puede tener más de 100 caracteres")
    }
    return new MeetupTitle(title.trim())
  }

  public getValue(): string {
    return this.value
  }
}
