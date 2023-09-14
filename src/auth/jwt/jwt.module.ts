import { Module } from '@nestjs/common';
import { InternalJwtService } from './jwt.service';
import { JwtController } from './jwt.controller';

@Module({
  controllers: [JwtController],
  providers: [InternalJwtService],
})
export class JwtInternalModule {}
