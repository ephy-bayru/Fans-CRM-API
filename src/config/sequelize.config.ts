import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';

export const sequelizeConfig = (
  configService: ConfigService,
): SequelizeModuleOptions => ({
  dialect: 'mysql',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT', 3306),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  models: [],
  autoLoadModels: true,
  synchronize: configService.get<string>('NODE_ENV') !== 'production',
  logging:
    configService.get<string>('NODE_ENV') === 'development'
      ? console.log
      : false,
  ssl: configService.get<string>('NODE_ENV') === 'production',
  define: {
    timestamps: true,
    underscored: true,
  },
});
