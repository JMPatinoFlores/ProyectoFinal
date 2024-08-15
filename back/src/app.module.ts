import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelsModule } from './hotels/hotels.module';
import { RoomsModule } from './rooms/rooms.module';
import { RoomsTypeModule } from './roomstype/roomstype.module';
import { HotelAdminsModule } from './hotel-admins/hotel-admins.module';
import { HotelAdmins } from './hotel-admins/hotelAdmins.entity';
import { HotelAdminsController } from './hotel-admins/hotel-admins.controller';
import { HotelAdminsService } from './hotel-admins/hotel-admins.service';
import { CustomersController } from './customers/customers.controller';
import { CustomersService } from './customers/customers.service';
import { Customers } from './customers/customers.entity';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { CustomersRepository } from './customers/customers.repository';
import { HotelAdminRepository } from './hotel-admins/hotel-admin.repository';
import { BookingModule } from './bookings/booking.module';
import { BookingDetailModule } from './bookingDetails/booking-detail.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CustomersModule } from './customers/customers.module';
import { NaturalLanguageProcessor } from './helper/natural-language-processor';
import { AvailabilityModule } from './availabilities/availability.module';
import { EmailNotifiModule } from './email-notify/email.module';
import { MailService } from './email-notify/mail.service';
import { PassportModule } from '@nestjs/passport';
import { SuperAdminModule } from './super-admin/super-admin.module';
import { SuperAdminRepository } from './super-admin/superAdmin.repository';
import { SuperAdminController } from './super-admin/super-admin.controller';
import { SuperAdminService } from './super-admin/super-admin.service';
import { SuperAdmins } from './super-admin/superAdmin.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    HotelsModule,
    RoomsModule,
    RoomsTypeModule,
    ReviewsModule,
    CustomersModule,
    HotelAdminsModule,
    SuperAdminModule,
    AuthModule,
    BookingModule,
    BookingDetailModule,
    AvailabilityModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '90d' },
    }),
    TypeOrmModule.forFeature([Customers, HotelAdmins, SuperAdmins]),
    EmailNotifiModule,
    PassportModule.register({ session: true }),
    SuperAdminModule,
  ],
  controllers: [
    AppController,
    HotelAdminsController,
    CustomersController,
    SuperAdminController,
  ],
  providers: [
    AppService,
    HotelAdminsService,
    CustomersService,
    SuperAdminService,
    AuthService,
    CustomersRepository,
    HotelAdminRepository,
    SuperAdminRepository,
    NaturalLanguageProcessor,
    MailService,
  ],
})
// export class AppModule implements OnModuleInit {
//   constructor(
//     private readonly nlpProcessor: NaturalLanguageProcessor
//   ){}
//   async onModuleInit() {
//     await this.nlpProcessor.initialize();
//   }
// }
export class AppModule {}
