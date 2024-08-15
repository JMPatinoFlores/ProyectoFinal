import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config as dotenvConfig } from 'dotenv';
import { AuthService } from '../auth.service';

dotenvConfig({ path: './.development.env' });
@Injectable()
export class CustomerGoogleStrategy extends PassportStrategy(Strategy, 'google-customer') {
  constructor(
    private readonly authService: AuthService
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'https://back-rutaviajera.onrender.com/auth/api/callback/google/register/customer',
      scope: ['profile', 'email'],
      state: true,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {

    const user = await this.authService.googleRegisterCustomer({email: profile.emails[0].value, name: profile.name.givenName, lastName: profile.name.familyName})
    return user || null;
    // done(null, user);
  }
}
