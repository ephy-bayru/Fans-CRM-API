import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SeedService } from './seed.service';
import { UsersModule } from 'src/modules/users/users.module';
import { LoggerService } from 'src/common/services/logger.service';
import { DatabaseService } from './database.service';
import databaseConfig from 'src/config/database.config';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const databaseService = new DatabaseService(configService);
        await databaseService.ensureDatabaseExists();
        return databaseConfig(configService);
      },
    }),
  ],
  providers: [DatabaseService, SeedService, LoggerService],
})
export class DatabaseModule implements OnApplicationBootstrap {
  constructor(
    private readonly seedService: SeedService,
    private readonly databaseService: DatabaseService,
  ) {}

  async onApplicationBootstrap() {
    await this.seedService.seedUsers();
  }
}
