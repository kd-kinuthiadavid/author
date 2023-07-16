import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import dbConfig from './db/config/dbConfig';
import { drizzleConfig } from 'drizzle.config';

@Module({
  imports: [
    DrizzleModule,
    // @see: https://docs.nestjs.com/techniques/configuration#configuration for more info
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [dbConfig, drizzleConfig],
    }),
    UsersModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
