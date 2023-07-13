import { Injectable } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/mysql2';
import { createConnection } from 'mysql2/promise';
import { ConfigService } from '@nestjs/config';
import { migrate } from 'drizzle-orm/mysql2/migrator';

import schema from './schema';

@Injectable()
export class DbConnectionService {
  constructor(private readonly configService: ConfigService) {}

  async createConnection() {
    const connection = await createConnection(
      this.configService.get<'string'>('DATABASE_URL'),
    );

    const dbInstance = drizzle(connection, { schema: { ...schema } });

    await migrate(dbInstance, { migrationsFolder: 'drizzle' });
    return dbInstance;
  }

  db = this.createConnection();
}
