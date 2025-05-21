import { DomainError } from "./DomainError"

export abstract class NotFoundError extends DomainError {
  constructor(private readonly resourceId: string) {
    super()
  }

  errorCode(): string {
    return "not_found"
  }

  errorMessage(): string {
    return `The ${this.resourceType()} <${this.resourceId}> has not been found`
  }

  protected abstract resourceType(): string
}
