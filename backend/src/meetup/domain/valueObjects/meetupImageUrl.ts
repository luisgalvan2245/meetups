export class MeetupImageUrl {
  private constructor(private readonly value: string) {}

  public static create(imageUrl: string): MeetupImageUrl {
    if (!imageUrl || imageUrl.trim().length === 0) {
      throw new Error("La URL de la imagen no puede estar vacía")
    }
    // Validación simple de URL
    try {
      new URL(imageUrl)
    } catch {
      throw new Error("La URL de la imagen no es válida")
    }
    return new MeetupImageUrl(imageUrl.trim())
  }

  public getValue(): string {
    return this.value
  }
}
