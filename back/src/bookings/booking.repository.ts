import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Booking } from "./booking.entity";
import { Repository } from "typeorm";
import { CreateBookingDto } from "./dtos/create-booking.dto";
import { BookingDetails } from "src/bookingDetails/booking-detail.entity";
import { BookingDetailStatus } from "../bookingDetails/enum/booking-detail-status.enum"

@Injectable()
export class BookingRepository {
    constructor(
        @InjectRepository(Booking) private readonly bookingDBRepository: Repository<Booking>,
        @InjectRepository(BookingDetails) private readonly bookingDetailsDBRepository: Repository<BookingDetails>
    ) { }

    async getBookings() {
        return await this.bookingDBRepository.find()
    }

    async getBookingById(id: string) {
        return await this.bookingDBRepository.findOne({ where: { id }, relations: ["bookingDetails"] })
    }

    async createBooking(bookingData: CreateBookingDto) {
        const {date, time, customerId, discount, checkInDate, checkOutDate, roomsIds} = bookingData

        // Cambiar a typeorm
        const customer = "Cliente de prueba."

        if (!customer) throw new NotFoundException('Customer no encontrado.')

        const status = BookingDetailStatus.CONFIRMED
        let total: number = 0
        let rooms

        for (const roomId of roomsIds) {
            //Cambiar a typeorm
            const room = { price: 50 }
            
            if (room) {
                total += room.price

                // rooms.push(room)
            }
        }

        rooms = "Array de rooms."

        if (rooms.length < 1) throw new NotFoundException('Rooms no encontrados.')

        let bookingDetails = this.bookingDetailsDBRepository.create({total, discount, checkInDate, checkOutDate, status, rooms})
        
        let booking = this.bookingDBRepository.create({ date, time, customer })
        
        // Agregar cuando estén implementadas las relaciones

        const newBookingDetails = await this.bookingDetailsDBRepository.save(bookingDetails)

        booking.bookingDetails = newBookingDetails

        return await this.bookingDBRepository.save(booking)

    }

    async cancelBooking(id: string) {
        console.log(id);
        
        const booking = await this.bookingDBRepository.findOne({ where: { id }, relations: ['bookingDetails'] })
        await this.bookingDetailsDBRepository.update({ id: booking.bookingDetails.id }, { status: BookingDetailStatus.CANCELLED })

        return "Booking cancelado exitosamente."
    }
}