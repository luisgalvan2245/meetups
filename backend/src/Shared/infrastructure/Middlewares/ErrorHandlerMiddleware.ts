import { DomainError } from "../../domain/Exceptions/DomainError"
import { InvalidValueError } from "../../domain/Exceptions/InvalidValueError"
import { NotFoundError } from "../../domain/Exceptions/NotFoundError"
import { InvalidUUIDError } from "../../domain/Exceptions/InvalidUUIDError"
import { Request, Response, NextFunction } from "express"
import { ValidateError } from "tsoa"
import status from "http-status"

type ErrorResponse = {
  status: number
  message: string
  fields?: unknown
}

export class ErrorHandlerMiddleware {
  static handle(err: Error, _req: Request, res: Response, _next: NextFunction) {
    const response: ErrorResponse = {
      status: status.INTERNAL_SERVER_ERROR,
      message: "Internal Server Error"
    }

    // Handle TSOA validation errors
    if (err?.name === "ValidateError") {
      response.status = status.BAD_REQUEST
      response.message = "Validation Error"
      response.fields = (err as ValidateError).fields
    }

    if (err instanceof InvalidUUIDError) {
      response.status = status.BAD_REQUEST
      response.message = err.message
    }

    if (err instanceof NotFoundError) {
      response.status = status.NOT_FOUND
      response.message = err.errorMessage()
    }

    if (err instanceof InvalidValueError) {
      response.status = status.UNPROCESSABLE_ENTITY
      response.message = err.message
    }

    if (err instanceof DomainError && !(err instanceof NotFoundError)) {
      response.status = status.BAD_REQUEST
      response.message = err.message
    }

    console.error(err)
    return res.status(response.status).json(response)
  }
}
