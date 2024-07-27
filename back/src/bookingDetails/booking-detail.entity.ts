import { Booking } from 'src/bookings/booking.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookingDetailStatus } from './enum/booking-detail-status.enum';
import { Hotel } from 'src/hotels/hotels.entity';

@Entity({ name: 'booking-details' })
export class BookingDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  total: number;

  @Column()
  discount: number;

  @Column()
  checkInDate: string;

  @Column()
  checkOutDate: string;

  @Column()
  status: BookingDetailStatus;

  @OneToOne(() => Booking)
  @JoinColumn({ name: 'booking-id' })
  booking: Booking;

  // @ManyToMany((type) => Hotel)
  // @JoinTable({
  //   name: 'bookingdetails_hotels',
  //   joinColumn: {
  //     name: 'hotel_Id',
  //     referencedColumnName: 'hotelId',
  //   },
  //   inverseJoinColumn: {
  //     name: 'bookingdetails_id',
  //     referencedColumnName: 'bookingDetailsId',
  //   },
  // })
  // hotels: Hotel[];
}
