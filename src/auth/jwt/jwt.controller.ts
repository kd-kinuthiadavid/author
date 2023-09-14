import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from './jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('auth/jwt')
export class JwtController {
  @Get('/login')
  async jwtLogin(@Request() req) {
    return {
      username: req.user.username.username,
      email: req.user.username.email,
    };
  }
}
