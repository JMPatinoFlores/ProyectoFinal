import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { BookingRepository } from './booking.repository';
import { BookingDetails } from 'src/bookingDetails/booking-detail.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Booking, BookingDetails])],
    controllers: [BookingController],
    providers: [BookingService, BookingRepository]
})
export class BookingModule {}
