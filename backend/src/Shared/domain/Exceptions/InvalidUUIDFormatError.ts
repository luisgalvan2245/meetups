import { FormatError } from "./FormatError"

export class InvalidUUIDFormatError extends FormatError {
  constructor(uuid: string) {
    super(uuid)
    this.name = "InvalidUUIDFormatError"
  }
}
