import { BookingDetails } from "src/bookingDetails/booking-detail.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'bookings'})
export class Booking {
    @PrimaryGeneratedColumn('uuid')
    bookingId: string

    @Column({type: 'varchar', length: 24})
    date: string

    @Column({type: 'varchar', length: 24})
    time: string

    @Column({type: 'boolean', default: false})
    isDeleted: boolean

    @OneToOne(() => BookingDetails)
    @JoinColumn({name: "booking-details-id"})
    bookingDetails: BookingDetails
}