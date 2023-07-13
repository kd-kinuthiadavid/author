import { Injectable } from '@nestjs/common';
import {
  PlanetScaleDatabase,
  drizzle,
} from 'drizzle-orm/planetscale-serverless';
import { connect } from '@planetscale/database';
import { ConfigService } from '@nestjs/config';

import schema from './schema';

@Injectable()
export class DbConnectionService {
  constructor(private readonly configService: ConfigService) {}

  public createConnection() {
    const connection = connect({
      host: this.configService.get<'string'>('DATABASE_HOST'),
      username: this.configService.get<'string'>('DATABASE_USERNAME'),
      password: this.configService.get<'string'>('DATABASE_PASSWORD'),
    });
    return drizzle(connection, { schema: { ...schema } });
  }

  public db = this.createConnection();
}
