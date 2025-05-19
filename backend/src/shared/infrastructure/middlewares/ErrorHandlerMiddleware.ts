import { DomainError } from "@/shared/domain/errors/DomainError"
import { Request, Response, NextFunction } from "express"

export class ErrorHandlerMiddleware {
  static handle(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof DomainError) {
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
