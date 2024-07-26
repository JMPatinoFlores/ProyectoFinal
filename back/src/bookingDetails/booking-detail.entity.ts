import { Booking } from "src/bookings/booking.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BookingDetailStatus } from "./enum/booking-detail-status.enum";
import { Hotel } from "src/hotels/hotels.entity";

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
    hotel: Hotel
}

