import { HealthCheckDocs } from './documentation/health.controller.documentation';
import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  SequelizeHealthIndicator,
} from '@nestjs/terminus';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CustomHealthIndicator } from './indicators/custom.health';

@ApiTags('Health')
@Controller({ path: 'health', version: '1' })
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: SequelizeHealthIndicator,
    private http: HttpHealthIndicator,
    private customIndicator: CustomHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  @HealthCheckDocs()
  @ApiOperation({ summary: 'Check application health' })
  check() {
    return this.health.check([
      () => this.db.pingCheck('database', { timeout: 300 }),
      () => this.http.pingCheck('externalService', 'https://fans-crm.com/'),
      () => this.customIndicator.isHealthy('customService'),
    ]);
  }
}
