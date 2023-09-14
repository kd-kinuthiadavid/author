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
import { GoogleAuthGuard } from './google/google.guard';
import { LocalAuthGuard } from './local.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.generateToken(req.user.username, req.user.email);
  }

  @Post('register')
  async register(@Request() req) {
    return this.authService.register(req.body);
  }
}
