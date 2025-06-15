import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from './logging.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    this.loggingService.log(
      `Method | URL: ${req.method} | ${req.url}${req.params[0]}`,
    );
    this.loggingService.log(`Body: ${JSON.stringify(req.body)}`);
    this.loggingService.log(`Query: ${JSON.stringify(req.query)}`);
    this.loggingService.log(`Status code: ${res.statusCode}`);
    next();
  }
}
