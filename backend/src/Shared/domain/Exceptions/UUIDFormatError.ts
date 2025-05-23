import { FormatError } from './FormatError';

export class UUIDFormatError extends FormatError {
  constructor(uuid: string) {
    super(`Invalid UUID format: ${uuid}`);
  }
}
