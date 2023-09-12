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

@UseGuards(GoogleAuthGuard)
@Controller('auth')
export class AuthController {}
