import { Module } from '@nestjs/common';
import { HotelAdminsController } from './hotel-admins.controller';
import { HotelAdminsService } from './hotel-admins.service';

@Module({
  controllers: [HotelAdminsController],
  providers: [HotelAdminsService],
})
export class HotelAdminsModule {}
