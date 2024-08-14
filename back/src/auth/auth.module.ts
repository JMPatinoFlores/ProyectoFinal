import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customers } from 'src/customers/customers.entity';
import { CustomersRepository } from 'src/customers/customers.repository';
import { HotelAdminRepository } from 'src/hotel-admins/hotel-admin.repository';
import { HotelAdmins } from 'src/hotel-admins/hotelAdmins.entity';
import { CustomersModule } from 'src/customers/customers.module';
import { HotelAdminsModule } from 'src/hotel-admins/hotel-admins.module';
import { MailService } from 'src/email-notify/mail.service';
import { SessionSerializer } from './Serializer';
import { CustomerGoogleStrategy } from './strategies/register.customer.google.strategy';
import { HotelAdminGoogleStrategy } from './strategies/register.hotelAdmin.google.strategy';
import { CustomerGoogleAuthGuard } from './guards/customer.google.authguard';
import { HotelAdminGoogleAuthGuard } from './guards/hotelAdmin.google.authguard';
import { SuperAdmins } from 'src/super-admin/superAdmin.entity';
import { SuperAdminModule } from 'src/super-admin/super-admin.module';
import { SuperAdminRepository } from 'src/super-admin/superAdmin.repository';
import { LoginGoogleStrategy } from './strategies/login.google.strategy';
import { LoginGoogleAuthGuard } from './guards/login.google.authguard copy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customers, HotelAdmins, SuperAdmins]),
    CustomersModule,
    HotelAdminsModule,
    SuperAdminModule,
  ],
  controllers: [AuthController],
  providers: [
    CustomerGoogleStrategy,
    HotelAdminGoogleStrategy,
    CustomerGoogleAuthGuard,
    HotelAdminGoogleAuthGuard,
    LoginGoogleStrategy,
    LoginGoogleAuthGuard,
    AuthService,
    CustomersRepository,
    HotelAdminRepository,
    SuperAdminRepository,
    MailService,
    SessionSerializer,
  ],
})
export class AuthModule {}
