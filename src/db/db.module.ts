import { Module } from '@nestjs/common';
import { DbConnectionService } from './db.service';

@Module({
  providers: [DbConnectionService],
  exports: [DbConnectionService],
})
export class DbModule {}
