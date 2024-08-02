import { Module } from '@nestjs/common';
import { HotelAdminsController } from './hotel-admins.controller';
import { HotelAdminsService } from './hotel-admins.service';
import { HotelAdminRepository } from './hotel-admin.repository';
import { HotelAdmins } from './hotelAdmins.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([HotelAdmins])],
  controllers: [HotelAdminsController],
  providers: [HotelAdminsService, HotelAdminRepository],
  exports: [HotelAdminRepository],
})
export class HotelAdminsModule {}
