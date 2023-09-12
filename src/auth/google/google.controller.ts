import { Controller, Get, Request, UseGuards, Logger } from '@nestjs/common';
import { CreateGoogleDto } from './dto/create-google.dto';
import { UpdateGoogleDto } from './dto/update-google.dto';
import { GoogleAuthGuard } from './google.guard';

@UseGuards(GoogleAuthGuard)
@Controller('auth/google')
export class GoogleController {
  private readonly logger = new Logger(GoogleController.name);

  @Get('/login')
  async googleLogin(@Request() req) {
    this.logger.log('------ login: google ------', req.user);
    return req.user;
  }

  @Get('/oauth2/redirect')
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
