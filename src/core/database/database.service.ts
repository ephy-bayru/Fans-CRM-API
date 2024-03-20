import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createPool } from 'mysql2/promise';

@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);

  constructor(private configService: ConfigService) {}

  async ensureDatabaseExists(): Promise<void> {
    const dbName = this.configService.get('DB_NAME');
    const host = this.configService.get('DB_HOST');
    const port = this.configService.get('DB_PORT');
    const username = this.configService.get('DB_USERNAME');
    const password = this.configService.get('DB_PASSWORD');

    const pool = createPool({
      host,
      port: parseInt(port, 10),
      user: username,
      password,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    try {
      await pool.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
      this.logger.log(`Database '${dbName}' is ready.`);
    } catch (error) {
      this.logger.error(`Failed to create database '${dbName}':`, error);
      throw error;
    } finally {
      await pool.end();
    }
  }
}
