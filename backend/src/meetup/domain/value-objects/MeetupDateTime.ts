import { DateValueObject } from "@/shared/domain/value-objects/DateValueObject"

export class MeetupDateTime extends DateValueObject {
  constructor(value: Date) {
    super(value)
  }

  public static create(date?: string | Date): MeetupDateTime {
    if (date) {
      return new MeetupDateTime(new Date(date))
    }
    return new MeetupDateTime(new Date())
  }
}
