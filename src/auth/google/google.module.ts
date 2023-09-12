import { Module } from '@nestjs/common';
import { GoogleService } from './google.service';
import { GoogleController } from './google.controller';
import { AuthService } from '../auth.service';
import { UsersService } from 'src/users/users.service';
import { DbConnectionService } from 'src/db/db.service';

@Module({
  controllers: [GoogleController],
  providers: [GoogleService, AuthService, UsersService, DbConnectionService],
})
export class GoogleModule {}
