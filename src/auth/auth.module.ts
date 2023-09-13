import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { DbConnectionService } from 'src/db/db.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { GoogleModule } from './google/google.module';
import { LocalStrategy } from './local.strategy';

@Module({
  providers: [
    AuthService,
    UsersService,
    DbConnectionService,
    PassportModule,
    LocalStrategy,
  ],
  exports: [AuthService],
  controllers: [AuthController],
  imports: [GoogleModule],
})
export class AuthModule {}
