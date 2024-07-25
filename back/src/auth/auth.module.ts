import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customers } from 'src/customers/customers.entitiy';
import { CustomersRepository } from 'src/customers/customers.repository';
import { HotelAdminRepository } from 'src/hotel-admins/hotel-admin.repository';
import { HotelAdmins } from 'src/hotel-admins/hotelAdmins.entitity';

@Module({
  imports: [TypeOrmModule.forFeature([Customers, HotelAdmins])],
  controllers: [AuthController],
  providers: [AuthService, CustomersRepository, HotelAdminRepository],
})
export class AuthModule {}
