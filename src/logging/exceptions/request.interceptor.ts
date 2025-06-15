import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoggingService } from '../logging.service';

@Injectable()
export class RequestInterceptor implements NestInterceptor {
  constructor(private readonly loggingService: LoggingService) {}

  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (typeof err !== 'object' || !('status' in err)) {
          this.loggingService.error(`Uncaught Exception: ${err.message}`);
        }
        return throwError(() => err);
      }),
    );
  }
}
