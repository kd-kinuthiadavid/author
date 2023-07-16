import { Module } from '@nestjs/common';
import { DbConnectionService } from './drizzle.service';

@Module({
  providers: [DbConnectionService],
  exports: [DbConnectionService],
})
export class DrizzleModule {}
