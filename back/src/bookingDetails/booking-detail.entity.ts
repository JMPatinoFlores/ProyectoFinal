import { Booking } from "src/bookings/booking.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Hotel } from "src/hotels/hotels.entity";
import { BookingDetailsStatus } from "./enum/booking-detail-status.enum";

@Entity({ name: 'booking-details' })
export class BookingDetails {
    @PrimaryGeneratedColumn('uuid')
    bookingDetailsId: string

    @Column({type: 'int', nullable: false})
    total: number

    @Column({type: 'int', nullable: true})
    discount: number

    @Column({type: 'varchar', length: 24, nullable: false})
    checkInDate: string

    @Column({type: 'varchar', length: 24, nullable: false})
    checkOutDate: string

    @Column({type: 'boolean', default: false})
    isDeleted: boolean

    @OneToOne(() => Booking)
    @JoinColumn({name: "booking-id"})
    booking: Booking

    @OneToMany(() => Hotel, (hotel) => hotel.bookingDetails)
    @JoinColumn({name: 'hotel-id'})
    hotel: Hotel

    @Column({default: BookingDetailsStatus.ACTIVE, nullable: false})
    status: BookingDetailsStatus
}

