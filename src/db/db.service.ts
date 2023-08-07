import { Injectable, Logger } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/mysql2';
import { createConnection } from 'mysql2/promise';
import { ConfigService } from '@nestjs/config';
import { migrate } from 'drizzle-orm/mysql2/migrator';

import schema from './schema';

@Injectable()
export class DbConnectionService {
  private readonly logger = new Logger(DbConnectionService.name);
  constructor(private readonly configService: ConfigService) {}

  private getConnection() {
    return createConnection(this.configService.get<'string'>('DATABASE_URL'));
  }

  private loadMigrationConfig(dbInstance) {
    return migrate(dbInstance, { migrationsFolder: 'drizzle' });
  }

  async getDbInstance() {
    try {
      this.logger.log('Establishing database connection ...');
      const connection = await this.getConnection();
      const dbInstance = drizzle(connection, { schema: { ...schema } });
      this.logger.log('Success. Successfully connected to the database');
      this.loadMigrationConfig(dbInstance)
        .then(() => this.logger.log('migrations config successfully loaded'))
        .catch((err) =>
          this.logger.error('error loading migrations config', err),
        );
      return dbInstance;
    } catch (error) {
      this.logger.error(
        'Database Connection Failed. Error connecting to the database',
        error,
      );
    }
  }

  async closeDatabaseConnection() {
    const connection = await this.getConnection();
    return connection.end();
  }

  db = this.getDbInstance();
}
