import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggingService {
  log(message: string) {
    console.log(`[LOG] ${message}`);
  }

  error(message: string) {
    console.error(`[ERROR] ${message}`);
  }

  warn(message: string) {
    console.warn(`[WARN] ${message}`);
  }

  debug(message: string) {
    console.debug(`[DEBUG] ${message}`);
  }
}
