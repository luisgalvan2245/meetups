import { DomainError } from "@/shared/domain/errors/DomainError"
import { InvalidArgumentError } from "@/shared/domain/errors/InvalidArgumentError"
import { NotFoundError } from "@/shared/domain/errors/NotFoundError"
import { Request, Response, NextFunction } from "express"

export class ErrorHandlerMiddleware {
  static handle(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof NotFoundError) {
      return res.status(404).json({
        status: 404,
        message: err.errorMessage()
      })
    } else if (err instanceof InvalidArgumentError) {
      return res.status(422).json({
        status: 422,
        message: err.message
      })
    } else if (err instanceof DomainError) {
      return res.status(400).json({
        status: 400,
        message: err.message
      })
    }

    // Handle HTTP errors (like the ones we throw in controllers)
    if ("status" in err) {
      const httpError = err as { status: number; message: string }
      return res.status(httpError.status).json({
        status: httpError.status,
        message: httpError.message
      })
    }

    // Handle unexpected errors
    console.error(err)
    return res.status(500).json({
      status: 500,
      message: "Internal server error"
    })
  }
}
