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

  async connect() {
    this.logger.log('Establishing database connection ...');
    try {
      const connection = await createConnection(
        this.configService.get<'string'>('DATABASE_URL'),
      );
      const dbInstance = drizzle(connection, { schema: { ...schema } });

      await migrate(dbInstance, { migrationsFolder: 'drizzle' });
      this.logger.log(
        "Database connection established. We've successfully connected to the database.",
      );
      return dbInstance;
    } catch (error) {
      //
      this.logger.error('Connection to the database failed.', error);
    }
  }

  db = this.connect();
}
