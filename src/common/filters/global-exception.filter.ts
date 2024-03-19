import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { LoggerService } from '../services/logger.service';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  async catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message =
        typeof exceptionResponse === 'object' &&
        (exceptionResponse as any).message
          ? (exceptionResponse as any).message
          : exceptionResponse;
      this.logger.logError(`HTTP Exception: ${message}`, {
        status,
        error: exceptionResponse,
        path: request.url,
        method: request.method,
      });
    } else if (exception instanceof Error) {
      this.logger.logError(`Error: ${exception.message}`, {
        status,
        stack: exception.stack,
        path: request.url,
        method: request.method,
      });
      message = exception.message;
    } else {
      const { serializeError } = await import('serialize-error');
      const serializedException = serializeError(exception);
      this.logger.logError('Unexpected error', {
        status,
        error: serializedException,
        path: request.url,
        method: request.method,
      });
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
