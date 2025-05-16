import { ValueObject } from "@/shared/domain/valueObjects/valueObject"

export class MeetupDate extends ValueObject<Date> {
  constructor(value: Date) {
    super(value)
  }

  static create(value: Date): MeetupDate {
    if (value < new Date()) {
      throw new Error("La fecha no puede ser en el pasado")
    }
    return new MeetupDate(value)
  }

  public getValue(): Date {
    return this.value
  }

  public toISOString(): string {
    return this.value.toISOString()
  }
}
