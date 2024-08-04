import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config as dotenvConfig } from 'dotenv';
import { AuthService } from '../auth.service';
import { Customers } from 'src/customers/customers.entity';
import { HotelAdmins } from 'src/hotel-admins/hotelAdmins.entity';

dotenvConfig({ path: './.development.env' });
@Injectable()
export class LoginGoogleStrategy extends PassportStrategy(Strategy, 'google-login') {
  constructor(
    private readonly authService: AuthService
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/api/auth/callback/google/login',
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

    const user: Customers | HotelAdmins = await this.authService.googleLogin({email: profile.emails[0].value})
    return user || null;
    // done(null, user);
  }
}
