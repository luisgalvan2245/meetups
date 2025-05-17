import type { Request, Response, NextFunction } from "express"

export function errorHandlerMiddleware(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (res.headersSent) return
  switch (err?.status) {
    case 400:
      return res.status(400).json({ message: "Bad Request" })
    case 404:
      return res.status(404).json({ message: "Not found" })
    case 422:
      return res.status(422).json({ message: "Unprocessable Entity" })
    default:
      return res.status(500).json({ message: "Internal server error" })
  }
}
