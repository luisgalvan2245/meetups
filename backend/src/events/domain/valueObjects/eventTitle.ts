export class EventTitle {
  private readonly value: string

  private constructor(value: string) {
    this.value = value
  }

  public static create(title: string): EventTitle {
    if (!title || title.trim().length === 0) {
      throw new Error("El título no puede estar vacío")
    }
    if (title.length > 100) {
      throw new Error("El título no puede tener más de 100 caracteres")
    }
    return new EventTitle(title.trim())
  }

  public getValue(): string {
    return this.value
  }
}
