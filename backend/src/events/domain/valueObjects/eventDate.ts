export class EventDate {
  private readonly value: Date

  private constructor(value: Date) {
    this.value = value
  }

  public static create(date: string | Date): EventDate {
    const parsedDate = new Date(date)
    if (isNaN(parsedDate.getTime())) {
      throw new Error("La fecha no es válida")
    }
    if (parsedDate < new Date()) {
      throw new Error("La fecha del evento no puede ser en el pasado")
    }
    return new EventDate(parsedDate)
  }

  public getValue(): Date {
    return this.value
  }

  public toISOString(): string {
    return this.value.toISOString()
  }
}
