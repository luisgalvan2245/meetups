import winston, { Logger as WinstonLoggerTP } from 'winston'

import { Logger } from '../../domain/logger/Logger'

export class WinstonLogger implements Logger {
  private logger: WinstonLoggerTP

  constructor() {
    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.prettyPrint(),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.colorize(),
        winston.format.printf(
          ({ timestamp, level, message, stack }) =>
            `\x1b[34m${timestamp}\x1b[0m ${level}: ${stack || message}`
        )
      ),
      transports: [new winston.transports.Console()]
    })
  }

  debug(message: string) {
    this.logger.debug(message)
  }

  error(message: string | Error) {
    this.logger.error(message)
  }

  info(message: string) {
    this.logger.info(message)
  }
}
