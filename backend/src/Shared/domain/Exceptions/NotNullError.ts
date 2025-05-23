import { FormatError } from "./FormatError"

export class NotNullError extends FormatError {
  constructor(value: string) {
    super(`Value must not be null: ${value}`)
  }
}
