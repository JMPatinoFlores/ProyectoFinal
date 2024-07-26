import { BookingDetails } from "src/bookingDetails/booking-detail.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'bookings'})
export class Booking {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    date: string

    @Column()
    time: string

    @OneToOne(() => BookingDetails)
    @JoinColumn({name: "booking-details-id"})
    bookingDetails: BookingDetails

    @Column()
    customer: string
}