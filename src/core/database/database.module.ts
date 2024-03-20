import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from 'src/modules/users/entities/user.entity';
import { SeedService } from './seed.service';
import { UsersModule } from 'src/modules/users/users.module';
import { LoggerService } from 'src/common/services/logger.service';
import { DatabaseService } from './database.service';

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

        return {
          dialect: 'mysql',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          models: [User],
          autoLoadModels: true,
          synchronize: configService.get('NODE_ENV') !== 'production',
        };
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
