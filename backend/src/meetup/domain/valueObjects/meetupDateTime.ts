import { ValueObject } from "@/shared/domain/valueObjects/valueObject"

export class MeetupDateTime extends ValueObject<Date> {
  private constructor(value: Date) {
    super(value)
  }

  public static create(date?: string | Date): MeetupDateTime {
    const parsedDate = date ? new Date(date) : new Date()
    if (isNaN(parsedDate.getTime())) {
      throw new Error("La fecha no es válida")
    }
    return new MeetupDateTime(parsedDate)
  }

  public toISOString(): string {
    return this.value.toISOString()
  }
}
