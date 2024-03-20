import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService } from '../services/logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const method = request.method;
    const url = request.url;
    const body = JSON.stringify(request.body, null, 2);

    this.logger.logInfo(`Incoming Request: [${method}] ${url}`, {
      body: body,
      queryParams: request.query,
      pathParams: request.params,
    });

    return next.handle().pipe(
      tap((responseBody) => {
        const response = httpContext.getResponse();
        const statusCode = response.statusCode;
        const delay = Date.now() - now;
        const formattedResponse = JSON.stringify(responseBody, null, 2);

        this.logger.logInfo(
          `Outgoing Response: [${method}] ${url} - Status: ${statusCode} - ${delay}ms`,
          { responseBody: formattedResponse },
        );
      }),
    );
  }
}
