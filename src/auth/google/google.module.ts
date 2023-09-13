import { Module } from '@nestjs/common';
import { GoogleService } from './google.service';
import { GoogleController } from './google.controller';
import { AuthService } from '../auth.service';
import { UsersService } from 'src/users/users.service';
import { DbConnectionService } from 'src/db/db.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [GoogleController],
  providers: [
    GoogleService,
    AuthService,
    UsersService,
    DbConnectionService,
    JwtService,
  ],
})
export class GoogleModule {}
