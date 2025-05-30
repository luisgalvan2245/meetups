/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import status from 'http-status'
import { ValidateError } from 'tsoa'

import { DomainError } from '../../domain/exceptions/DomainError'
import { InvalidArgumentError } from '../../domain/exceptions/InvalidArgumentError'
import { NotFoundError } from '../../domain/exceptions/NotFoundError'

interface ErrorResponse {
  message: string
  details?: unknown
}

export function ErrorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  let statusCode: number = status.INTERNAL_SERVER_ERROR
  const response: ErrorResponse = {
    message: 'Internal Server Error'
  }

  if (err?.name === 'ValidateError') {
    statusCode = status.UNPROCESSABLE_ENTITY
    response.message = 'Validation Error'
    response.details = (err as ValidateError).fields
  } else if (err instanceof InvalidArgumentError) {
    statusCode = status.UNPROCESSABLE_ENTITY
    response.message = err.message
  } else if (err instanceof NotFoundError) {
    statusCode = status.NOT_FOUND
    response.message = err.message
  } else if (err instanceof DomainError) {
    statusCode = status.BAD_REQUEST
    response.message = err.message
  }

  res.status(statusCode).json(response)
}
