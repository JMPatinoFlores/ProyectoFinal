import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
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
import { Request, Response } from 'express';
import { CustomerGoogleAuthGuard } from './guards/customer.google.authguard';
import { HotelAdminGoogleAuthGuard } from './guards/hotelAdmin.google.authguard';
import { LoginGoogleAuthGuard } from './guards/login.google.authguard copy';
import { JwtService } from '@nestjs/jwt';
import { Customers } from 'src/customers/customers.entity';
import { HotelAdmins } from 'src/hotel-admins/hotelAdmins.entity';
@ApiTags('Autenticación y recuperación de contraseñas')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly jwtService: JwtService) {}

  @Get('api/google/register/customer')
  @UseGuards(CustomerGoogleAuthGuard)
  async googleCustomerAuth(@Req() req: Request) {}

  @Get('api/callback/google/register/customer')
  @UseGuards(CustomerGoogleAuthGuard)
  async googleCustomerAuthRedirect(@Req() req: Request, @Res() res: Response) {
    res.redirect('http://localhost:3001')
  }

  @Get('api/google/register/hotelAdmin')
  @UseGuards(HotelAdminGoogleAuthGuard)
  async googleHotelAdminAuth(@Req() req: Request) {}

  @Get('api/callback/google/register/hotelAdmin')
  @UseGuards(HotelAdminGoogleAuthGuard)
  async googleHotelAdminAuthRedirect(@Req() req: Request, @Res() res: Response) {
    res.redirect('http://localhost:3001')
  }

  @Get('api/google/login')
  @UseGuards(LoginGoogleAuthGuard)
  async googleLoginAuth(@Req() req: Request) {}

  @Get('api/callback/google/login')
  @UseGuards(LoginGoogleAuthGuard)
  async googleLoginAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const user: any = req.user;
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    };
    const token = this.jwtService.sign(payload);
    
    return res.json({
      message: 'Usuario logueado',
      user,
      token,
    });
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
