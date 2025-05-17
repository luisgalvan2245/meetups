import winston from "winston"

export function createLogger(): winston.Logger {
  const colorize = winston.format.colorize()
  const timestampFormat = winston.format.timestamp({
    format: "YYYY-MM-DD HH:mm:ss"
  })
  const errorStack = winston.format.errors({ stack: true })
  const customFormat = winston.format.printf(
    ({ level, message, timestamp, ...meta }) => {
      const metaString = Object.keys(meta).length ? JSON.stringify(meta) : ""
      return `\x1b[34m[${timestamp}]\x1b[0m ${level}: ${message} ${metaString}`
    }
  )

  return winston.createLogger({
    level: process.env.NODE_ENV === "development" ? "debug" : "info",
    format: winston.format.combine(
      colorize,
      timestampFormat,
      errorStack,
      customFormat
    ),
    transports: [new winston.transports.Console()]
  })
}

export const logger = createLogger()
