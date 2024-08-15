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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { CustomerGoogleAuthGuard } from './guards/customer.google.authguard';
import { HotelAdminGoogleAuthGuard } from './guards/hotelAdmin.google.authguard';
import { RolesGuard } from './guards/roles.guard';
import { AuthGuard } from './guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from './guards/roles.enum';
import { CreateSuperAdmin } from 'src/super-admin/superAdmin.dto';
import { LoginGoogleAuthGuard } from './guards/login.google.authguard copy';
import { JwtService } from '@nestjs/jwt';

@ApiTags('Autenticación y recuperación de contraseñas')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('api/google/register/customer')
  @UseGuards(CustomerGoogleAuthGuard)
  async googleCustomerAuth(@Req() req: Request) {}

  @Get('api/callback/google/register/customer')
  @UseGuards(CustomerGoogleAuthGuard)
  async googleCustomerAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const user: any = req.user;
    if (user !== null && typeof user === 'object' && !Array.isArray(user))
      res.redirect('https://rutaviajera.vercel.app/login');
    if (typeof user === 'string')
      res.redirect(`https://rutaviajera.vercel.app/register?${user}`);
  }

  @Get('api/google/register/hotelAdmin')
  @UseGuards(HotelAdminGoogleAuthGuard)
  async googleHotelAdminAuth(@Req() req: Request) {}

  @Get('api/callback/google/register/hotelAdmin')
  @UseGuards(HotelAdminGoogleAuthGuard)
  async googleHotelAdminAuthRedirect(
    @Req() req: Request,

    @Res() res: Response,
  ) {
    const user: any = req.user;
    if (user !== null && typeof user === 'object' && !Array.isArray(user))
      res.redirect('https://rutaviajera.vercel.app/login');
    if (typeof user === 'string')
      res.redirect(`https://rutaviajera.vercel.app/register?${user}`);
  }

  @Get('api/google/login')
  @UseGuards(LoginGoogleAuthGuard)
  async googleLoginAuth(@Req() req: Request) {}

  @Get('api/callback/google/login')
  @UseGuards(LoginGoogleAuthGuard)
  async googleLoginAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const user: any = req.user;
    if (user !== null && typeof user === 'object' && !Array.isArray(user)) {
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      };
      const token = this.jwtService.sign(payload);
      if (payload.isAdmin)
        res.redirect(`https://rutaviajera.vercel.app/dashboard?token=${token}`);
      if (!payload.isAdmin)
        res.redirect(`https://rutaviajera.vercel.app/home?token=${token}`);
    }
    if (typeof user === 'string') {
      res.redirect(`https://rutaviajera.vercel.app/register?${user}=userDoesNotExist`);
    }
  }

  @Post('cxSignUp')
  @ApiOperation({ summary: 'Registro de cliente' })
  cxSignUp(@Body() customer: CreateCustomerDto) {
    return this.authService.signUpCustomer(customer);
  }

  @Post('adminSignUp')
  @ApiOperation({ summary: 'Registro de hotelero' })
  adminSignUp(@Body() hotelAdmin: CreateHotelAdminDto) {
    return this.authService.signUpHotelAdmin(hotelAdmin);
  }

  @Post('superAdminSignUp')
  @ApiBearerAuth()
  // @Roles(Role.SuperAdmin)
  // @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Registro de Super Admin' })
  superAdminSignUp(@Body() superAdmin: CreateSuperAdmin) {
    return this.authService.signUpSuperAdmin(superAdmin);
  }

  @Post('SignIn')
  @ApiOperation({ summary: 'Inicio de sesión' })
  cxSignIn(@Body() credentials: LoginCustomerDto) {
    const { email, password } = credentials;
    return this.authService.signIn(email, password);
  }

  @Post('password-recovery')
  @ApiOperation({ summary: 'Envío de correo para cambiar la contraseña' })
  passwordRecovery(@Body() passwordRecovery: PasswordRecoveryDto) {
    return this.authService.passwordRecovery(passwordRecovery);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Recuperación de contraseña (requiere Token)' })
  resetPassword(@Body() resetPassword: ResetPasswordDto) {
    return this.authService.resetPassword(resetPassword);
  }

  @Put('changePassword')
  @ApiBearerAuth()
  @Roles(Role.Admin, Role.User, Role.SuperAdmin)
  @UseGuards(RolesGuard, AuthGuard)
  @ApiOperation({ summary: 'Cambio de contraseña' })
  changePassword(
    @Param('id') id: string,
    @Body() updatePassword: UpdatePasswordDto,
  ) {
    return this.authService.changePassword(id, updatePassword);
  }
}
