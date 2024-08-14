import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelsController } from './hotels.controller';
import { Hotel } from './hotels.entity';
import { HotelsService } from './hotels.service';
import { HotelAdmins } from 'src/hotel-admins/hotelAdmins.entity';
import { HotelsRepository } from './hotels.repository';


@Module({
  imports: [TypeOrmModule.forFeature([Hotel, HotelAdmins])],
  controllers: [HotelsController],
  providers: [HotelsRepository, HotelsService],
})
export class HotelsModule {}
