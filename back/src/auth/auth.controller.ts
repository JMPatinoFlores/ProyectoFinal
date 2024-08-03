import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CreateCustomerDto,
  LoginCustomerDto,
} from 'src/customers/customers.dto';
import { CreateHotelAdminDto } from 'src/hotel-admins/hotel-admin.dto';
import {
  PasswordRecoveryDto,
  ResetPasswordDto,
  UpdatePasswordDto,
} from './passwords.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('Autenticación y recuperación de contraseñas')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('callback/google')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req);
  }

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

  @Post('password-recovery')
  passwordRecovery(@Body() passwordRecovery: PasswordRecoveryDto) {
    return this.authService.passwordRecovery(passwordRecovery);
  }

  @Post('reset-password')
  resetPassword(@Body() resetPassword: ResetPasswordDto) {
    return this.authService.resetPassword(resetPassword);
  }

  @Put('changePassword')
  changePassword(
    @Param('id') id: string,
    @Body() updatePassword: UpdatePasswordDto,
  ) {
    return this.authService.changePassword(id, updatePassword);
  }
}
