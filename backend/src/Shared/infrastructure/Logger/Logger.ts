import winston, { Logger, format as wf } from 'winston'

function createLogger(): Logger {
  const timestamp = wf.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })
  const errors = wf.errors({ stack: true })

  const logFormat = wf.printf(({ level, message, timestamp, ...meta }) => {
    const metaStr = Object.keys(meta).length
      ? JSON.stringify(meta, null, 2)
      : ''
    return `\x1b[34m[${timestamp}]\x1b[0m ${level}: ${message} ${metaStr}`
  })

  return winston.createLogger({
    level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
    format: wf.combine(wf.colorize(), timestamp, errors, logFormat),
    transports: [new winston.transports.Console()],
  })
}

export const logger = createLogger()
