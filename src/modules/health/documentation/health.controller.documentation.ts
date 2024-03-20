import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

export function HealthCheckDocs() {
  return applyDecorators(
    ApiTags('Health'),
    ApiOperation({
      summary: 'Check application health',
      description:
        'Performs a comprehensive health check of the application, including database connectivity, external HTTP service availability, and custom health indicators. This endpoint is essential for monitoring the application’s status and ensuring that all components are functioning correctly.',
    }),
    ApiResponse({
      status: 200,
      description: 'Health check successful. All systems are operational.',
      schema: {
        example: {
          status: 'ok',
          info: {
            database: { status: 'up' },
            externalService: { status: 'up', url: 'https://example.com/' },
            customService: { status: 'up', customIndicator: 'Service healthy' },
          },
          error: {},
          details: {
            database: { status: 'up' },
            externalService: { status: 'up', url: 'https://example.com/' },
            customService: { status: 'up', customIndicator: 'Service healthy' },
          },
        },
      },
    }),
    ApiResponse({
      status: 503,
      description:
        'Health check failed. One or more components are not operational.',
      schema: {
        example: {
          status: 'error',
          info: {},
          error: {
            database: { status: 'down', message: 'Database connection error' },
            externalService: {
              status: 'down',
              message: 'Timeout',
              url: 'https://example.com/',
            },
            customService: {
              status: 'down',
              message: 'Custom service not responding',
              customIndicator: 'Service unhealthy',
            },
          },
          details: {
            database: { status: 'down', message: 'Database connection error' },
            externalService: {
              status: 'down',
              message: 'Timeout',
              url: 'https://example.com/',
            },
            customService: {
              status: 'down',
              message: 'Custom service not responding',
              customIndicator: 'Service unhealthy',
            },
          },
        },
      },
    }),
  );
}
