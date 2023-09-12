import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { DbConnectionService } from 'src/db/db.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { GoogleModule } from './google/google.module';

@Module({
  providers: [AuthService, UsersService, DbConnectionService, PassportModule],
  exports: [AuthService],
  controllers: [AuthController],
  imports: [GoogleModule],
})
export class AuthModule {}
