import { Booking } from "src/bookings/booking.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BookingDetailsStatus } from "./enum/booking-detail-status.enum";
import { Hotel } from "src/hotels/hotels.entity";

@Entity({ name: 'booking-details' })
export class BookingDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

    @Column({type: 'int', nullable: false})
    total: number

    @Column({type: 'int', nullable: true})
    discount: number

    @Column({type: 'boolean', default: false})
    isDeleted: boolean

    @OneToOne(() => Booking)
    booking: Booking

    @ManyToOne(() => Hotel, (hotel) => hotel.bookingDetails)
    @JoinColumn({name: 'hotel-id'})
    hotel: Hotel

    @Column({default: BookingDetailsStatus.ACTIVE, nullable: false})
    status: BookingDetailsStatus
}
