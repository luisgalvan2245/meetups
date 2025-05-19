import { DomainError } from "@/shared/domain/errors/DomainError"
import { InvalidArgumentError } from "@/shared/domain/errors/InvalidArgumentError"
import { NotFoundError } from "@/shared/domain/errors/NotFoundError"
import { Request, Response, NextFunction } from "express"
import { ValidateError } from "tsoa"

export class ErrorHandlerMiddleware {
  static handle(err: Error, _req: Request, res: Response, _next: NextFunction) {
    // Handle TSOA validation errors
    if (err?.name === "ValidateError") {
      return res.status(400).json({
        status: 400,
        message: "Validation error",
        fields: (err as ValidateError).fields
      })
    }

    // Handle domain errors
    if (err instanceof NotFoundError) {
      return res.status(404).json({
        status: 404,
        message: err.errorMessage()
      })
    }

    if (err instanceof InvalidArgumentError) {
      return res.status(422).json({
        status: 422,
        message: err.message
      })
    }
    if (err instanceof DomainError) {
      return res.status(400).json({
        status: 400,
        message: err.message
      })
    }

    console.error(err)
    return res.status(500).json({
      status: 500,
      message: "Internal server error"
    })
  }
}
