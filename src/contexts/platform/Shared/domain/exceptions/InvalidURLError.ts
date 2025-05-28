import { ValidationError } from './ValidationError'

export class InvalidURLError extends ValidationError {
  constructor(url: string) {
    super(`Invalid URL: ${url}`)
  }
}
