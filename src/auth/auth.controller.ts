import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { GoogleAuthGuard } from './google.guard';

@UseGuards(GoogleAuthGuard)
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  @Get('/login/google')
  async googleLogin(@Request() req) {
    this.logger.log('------ login: google ------', req.user);
    return req.user;
  }

  @Get('/oauth2/redirect/google')
  googleAuthRedirect(@Request() req) {
    if (!req.user) {
      this.logger.error('No user from google');
    }

    if (!req.user[0]) {
      this.logger.log('No user from google');
    }

    this.logger.log('Success: user from google', req.user);
    return req.user;
  }
}
