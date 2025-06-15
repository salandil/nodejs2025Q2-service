import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from './logging.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly logging: LoggingService) {}

  handleResponse(res: Response) {
    const rawResponse = res.write;
    const rawResponseEnd = res.end;
    const chunkBuffers = [];
    res.write = (...chunks) => {
      const resArgs = [];
      for (let i = 0; i < chunks.length; i++) {
        resArgs[i] = chunks[i];
        if (!resArgs[i]) {
          res.once('drain', res.write);
          i--;
        }
      }
      if (resArgs[0]) {
        chunkBuffers.push(Buffer.from(resArgs[0]));
      }
      return rawResponse.apply(res, resArgs);
    };
    res.end = (...chunk) => {
      const resArgs = [];
      chunk.forEach((chunk) => {
        resArgs.push(chunk);
      });
      if (resArgs[0]) {
        chunkBuffers.push(Buffer.from(resArgs[0]));
      }
      const body = Buffer.concat(chunkBuffers).toString('utf8');
      const { statusCode } = res;
      try {
        const message = `Response: Status Code: ${statusCode} | Body: ${JSON.stringify(JSON.parse(body))}`;

        if (statusCode >= 500) {
          this.logging.error(message);
        } else if (statusCode >= 400 && statusCode < 500) {
          this.logging.warn(message);
        } else {
          this.logging.log(message);
        }
      } catch (error) {
        this.logging.log(`Response: Status Code: ${res.statusCode}`);
      }
      return rawResponseEnd.apply(res, resArgs);
    };
  }

  async use(req: Request, res: Response, next: NextFunction) {
    this.handleResponse(res);

    this.logging.log(
      `Request: Method: ${req.method} | URL:${req.url}${req.params[0]} | Body: ${JSON.stringify(req.body)} | Params: ${JSON.stringify(req.query)}`,
    );
    next();
  }
}
