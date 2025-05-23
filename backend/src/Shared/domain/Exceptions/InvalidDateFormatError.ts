import { FormatError } from './FormatError';

export class InvalidDateFormatError extends FormatError {
  constructor(date: Date) {
    super(`Invalid date format: ${date}`);
  }
}
