import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CreateCustomerDto,
  LoginCustomerDto,
} from 'src/customers/customers.dto';
import {
  CreateHotelAdminDto,
  LoginHotelAdminDto,
} from 'src/hotel-admins/hotel-admin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('cxSignUp')
  cxSignUp(@Body() customer: CreateCustomerDto) {
    return this.authService.signUpCustomer(customer);
  }

  @Post('adminSignUp')
  adminSignUp(@Body() hotelAdmin: CreateHotelAdminDto) {
    return this.authService.signUpHotelAdmin(hotelAdmin);
  }

  @Post('SignIn')
  cxSignIn(@Body() credentials: LoginCustomerDto) {
    const { email, password } = credentials;
    return this.authService.signIn(email, password);
  }
}
