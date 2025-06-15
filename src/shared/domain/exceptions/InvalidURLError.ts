import { InvalidArgumentError } from './InvalidArgumentError'

export class InvalidURLError extends InvalidArgumentError {
  constructor(url: string) {
    super(`Invalid URL: ${url}`)
  }
}
