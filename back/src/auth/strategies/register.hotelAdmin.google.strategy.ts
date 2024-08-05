import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config as dotenvConfig } from 'dotenv';
import { AuthService } from '../auth.service';

dotenvConfig({ path: './.development.env' });
@Injectable()
export class HotelAdminGoogleStrategy extends PassportStrategy(
  Strategy,
  'google-hotelAdmin',
) {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        'http://localhost:3000/api/auth/callback/google/register/hotelAdmin',
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
    const user = await this.authService.googleRegisterHotelAdmin({
      email: profile.emails[0].value,
      name: profile.name.givenName,
      lastName: profile.name.familyName,
    });
    return user || null;
    // done(null, user);
  }
}
