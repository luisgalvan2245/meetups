import winston from "winston"

export const logger = winston.createLogger({
  level: process.env.NODE_ENV === "development" ? "debug" : "info",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.errors({ stack: true }),
    winston.format.printf(({ level, message, timestamp, ...meta }) => {
      const blueTimestamp = `\x1b[34m[${timestamp}]\x1b[0m`
      let metaString = Object.keys(meta).length ? JSON.stringify(meta) : ""
      return `${blueTimestamp} ${level}: ${message} ${metaString}`
    })
  ),
  transports: [new winston.transports.Console()]
})
