import { Injectable } from "@nestjs/common";
import { BookingRepository } from "./booking.repository";
import { CreateBookingDto } from "./dtos/create-booking.dto";

@Injectable()
export class BookingService {
    constructor(private readonly bookingRepository: BookingRepository) { }
    
    async getBookings(page: number, limit: number) {
        const bookings = await this.bookingRepository.getBookings()
        const start = (page - 1) * limit
        const end = start + limit

        return bookings.slice(start, end)
    }

    async getBookingById(id: string) {
        return await this.bookingRepository.getBookingById(id)
    }

    async createBooking(bookingData: CreateBookingDto) {
        return await this.bookingRepository.createBooking(bookingData)
    }

    async cancelBooking(id: string) {
        return this.bookingRepository.cancelBooking(id)
    }
}