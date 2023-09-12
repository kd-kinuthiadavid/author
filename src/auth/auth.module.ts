import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { DbConnectionService } from 'src/db/db.service';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './auth.google.strategy';
import { AuthController } from './auth.controller';

@Module({
  providers: [
    AuthService,
    UsersService,
    DbConnectionService,
    PassportModule,
    GoogleStrategy,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
