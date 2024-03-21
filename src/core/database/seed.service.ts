import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { UsersService } from 'src/modules/users/services/users.service';
import { DEFAULT_USER as defaultUser } from './users.constants';
import { LoggerService } from 'src/common/services/logger.service';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    private usersService: UsersService,
    private logger: LoggerService,
  ) {}

  async onApplicationBootstrap() {
    await this.seedUsers();
  }

  async seedUsers() {
    try {
      const user = await this.usersService.findOne(defaultUser.email);
      if (!user) {
        await this.usersService.createUser({
          ...defaultUser,
        });
        this.logger.logInfo(`Seeded user successfully: ${defaultUser.email}`);
      } else {
        this.logger.logInfo(`User already exists: ${defaultUser.email}`);
      }
    } catch (error) {
      this.logger.logError(`Failed to seed user: ${defaultUser.email}`, {
        error: error.message,
      });
    }
  }
}
