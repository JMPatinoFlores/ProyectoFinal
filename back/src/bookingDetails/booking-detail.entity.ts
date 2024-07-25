import { Booking } from "src/bookings/booking.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BookingDetailStatus } from "./enum/booking-detail-status.enum";

@Entity({ name: 'booking-details' })
export class BookingDetails {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    total: number

    @Column()
    discount: number

    @Column()
    checkInDate: string

    @Column()
    checkOutDate: string

    @Column()
    status: BookingDetailStatus

    @OneToOne(() => Booking)
    @JoinColumn({name: "booking-id"})
    booking: Booking

    //Arreglar con relaciones de typeorm
    @Column()
    rooms: string
}

