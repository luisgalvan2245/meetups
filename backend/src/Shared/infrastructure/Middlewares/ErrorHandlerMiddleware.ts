import { NextFunction, Request, Response } from 'express'
import status from 'http-status'
import { ValidateError } from 'tsoa'

import { BusinessRuleError } from '../../domain/Exceptions/BusinessRuleError'
import { DomainError } from '../../domain/Exceptions/DomainError'
import { FormatError } from '../../domain/Exceptions/FormatError'
import { NotFoundError } from '../../domain/Exceptions/NotFoundError'

type ErrorResponse = {
  message: string
  fields?: unknown
}

export class ErrorHandlerMiddleware {
  static handle(err: Error, _req: Request, res: Response, _next: NextFunction) {
    let statusCode: number = status.INTERNAL_SERVER_ERROR
    const response: ErrorResponse = {
      message: 'Internal Server Error'
    }

    if (err?.name === 'ValidateError') {
      statusCode = status.BAD_REQUEST
      response.message = 'Validation Error'
      response.fields = (err as ValidateError).fields
    } else if (err instanceof FormatError) {
      statusCode = status.BAD_REQUEST
      response.message = err.message
    } else if (err instanceof NotFoundError) {
      statusCode = status.NOT_FOUND
      response.message = err.message
    } else if (err instanceof BusinessRuleError) {
      statusCode = status.UNPROCESSABLE_ENTITY
      response.message = err.message
    } else if (err instanceof DomainError) {
      statusCode = status.BAD_REQUEST
      response.message = err.message
    }

    res.status(statusCode).json(response)
  }
}
