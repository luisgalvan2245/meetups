import type { Request, Response, NextFunction } from "express"

interface AppError {
  status?: number
  message?: string
}

export function errorHandlerMiddleware(
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (res.headersSent) return

  const status = err.status ?? 500

  const messages: Record<number, string> = {
    400: "Bad Request",
    404: "Not Found",
    422: "Unprocessable Entity",
    500: "Internal Server Error"
  }

  const message = messages[status] || "Unexpected error"

  res.status(status).json({ message })
}
