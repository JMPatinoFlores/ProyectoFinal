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
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './Serializer';
import { CustomerGoogleStrategy } from './strategies/customer.google.strategy';
import { HotelAdminGoogleStrategy } from './strategies/hotelAdmin.google.strategy';
import { CustomerGoogleAuthGuard } from './guards/customer.google.authguard';
import { HotelAdminGoogleAuthGuard } from './guards/hotelAdmin.google.authguard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customers, HotelAdmins]),
    CustomersModule,
    HotelAdminsModule,
  ],
  controllers: [AuthController],
  providers: [
    CustomerGoogleStrategy,
    HotelAdminGoogleStrategy,
    CustomerGoogleAuthGuard,
    HotelAdminGoogleAuthGuard,
    AuthService,
    CustomersRepository,
    HotelAdminRepository,
    MailService,
    SessionSerializer,
    { provide: 'AUTH_SERVICE', useClass: AuthService }
  ],
})
export class AuthModule { }
