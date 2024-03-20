import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { UsersService } from 'src/modules/users/services/users.service';
import * as bcrypt from 'bcrypt';
import { DEFAULT_USERS } from './users.constants';
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
    for (const defaultUser of DEFAULT_USERS) {
      try {
        const userExists = await this.usersService.findOne(defaultUser.email);
        if (!userExists) {
          const hashedPassword = await bcrypt.hash(defaultUser.password, 10);
          await this.usersService.createUser({
            ...defaultUser,
            password: hashedPassword,
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
}
