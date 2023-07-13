import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import dbConfig from './drizzle/config/dbConfig';

@Module({
  imports: [
    DrizzleModule,
    // @see: https://docs.nestjs.com/techniques/configuration#configuration for more info
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [dbConfig],
    }),
    UsersModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
