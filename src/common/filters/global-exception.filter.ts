import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LoggerService } from '../services/logger.service';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException ? exception.getResponse() : null;
    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: exceptionResponse || 'Unexpected error occurred',
    };

    if (exception instanceof Error) {
      this.logger.logError(`Error: ${exception.message}`, {
        errorResponse,
        stack: exception.stack || 'No stack trace',
      });
    } else {
      this.logger.logError('Unexpected error', {
        errorResponse,
        error: 'Unknown error type',
      });
    }

    response.status(status).json(errorResponse);
  }
}
