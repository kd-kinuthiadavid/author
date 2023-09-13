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

@UseGuards(LocalAuthGuard)
@Controller('auth')
export class AuthController {
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }
}
