import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';

export default (configService: ConfigService): SequelizeModuleOptions => ({
  dialect: 'mysql',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  autoLoadModels: true,
  synchronize: configService.get('NODE_ENV') !== 'production',

  // Connection pool configuration
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },

  // Logging configuration
  logging: configService.get('DB_LOGGING') === 'true' ? console.log : false,

  // For SSL connections
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },

  // Timezone configuration for the database
  timezone: '+00:00',

  // operatorsAliases: false,

  define: {
    underscored: true,
    freezeTableName: true,
  },
});
