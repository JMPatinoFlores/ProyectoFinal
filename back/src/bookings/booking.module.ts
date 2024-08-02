import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { BookingRepository } from './booking.repository';
import { BookingDetails } from 'src/bookingDetails/booking-detail.entity';
import { Room } from 'src/rooms/rooms.entity';
import { RoomsType } from 'src/roomstype/roomstype.entity';
import { Hotel } from 'src/hotels/hotels.entity';
import { RoomAvailability } from 'src/availabilities/availability.entity';
import { Customers } from 'src/customers/customers.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Booking, BookingDetails, Room, RoomsType, Hotel, RoomAvailability, Customers])],
    controllers: [BookingController],
    providers: [BookingService, BookingRepository]
})
export class BookingModule {}
