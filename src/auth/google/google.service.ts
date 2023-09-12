import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class GoogleService extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(GoogleService.name);
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      clientID: process.env['GOOGLE_CLIENT_ID'],
      clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
      callbackURL: 'http://localhost:3000/auth/google/oauth2/redirect',
      scope: ['email', 'profile'],
      state: true,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const emails = profile.emails;
    const user = await this.authService.validateUser(emails[0].value);

    if (!user[0]) {
      this.logger.log('Creating user ...');
      await this.usersService.create({
        username: profile.displayName || '',
        firstName: profile.displayName.split(' ')[0],
        lastName: profile.displayName.split(' ')[1],
        email: emails[0].value,
      });

      const createdUser = await this.authService.validateUser(emails[0].value);
      return done(null, createdUser);
    }
    this.logger.log('success: validated user via google login');
    return done(null, user);
  }
}
