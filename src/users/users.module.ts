import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DrizzleModule } from 'src/db/db.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [DrizzleModule],
  exports: [UsersService],
})
export class UsersModule {}
