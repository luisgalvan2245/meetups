import { FormatError } from './FormatError'

export class InvalidURLFormatError extends FormatError {
  constructor(url: string) {
    super(`Invalid URL format: ${url}`)
  }
}
