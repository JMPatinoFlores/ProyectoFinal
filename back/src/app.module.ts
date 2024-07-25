import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CostumersModule } from './customers/custumers.module';
import { HotelAdminsModule } from './hotel-admins/hotel-admins.module';
import { HotelAdmins } from './hotel-admins/hotelAdmins.entitity';
import { HotelAdminsController } from './hotel-admins/hotel-admins.controller';
import { HotelAdminsService } from './hotel-admins/hotel-admins.service';
import { CustomersController } from './customers/customers.controller';
import { CustomersService } from './customers/customers.service';
import { Customers } from './customers/customers.entitiy';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { CustomersRepository } from './customers/customers.repository';
import { HotelAdminRepository } from './hotel-admins/hotel-admin.repository';

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
    CostumersModule,
    HotelAdminsModule,
    AuthModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30m' },
    }),
    TypeOrmModule.forFeature([Customers, HotelAdmins]),
  ],
  controllers: [AppController, HotelAdminsController, CustomersController],
  providers: [
    AppService,
    HotelAdminsService,
    CustomersService,
    AuthService,
    CustomersRepository,
    HotelAdminRepository,
  ],
})
export class AppModule {}
