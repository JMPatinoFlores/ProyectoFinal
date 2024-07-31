import { Injectable } from '@nestjs/common';
import { BookingRepository } from './booking.repository';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { PostponeBookingDto } from './dtos/postpone-booking.dto';

@Injectable()
export class BookingService {
  constructor(private readonly bookingRepository: BookingRepository) { }

  async getBookings(page: number, limit: number) {
    const bookings = await this.bookingRepository.getBookings();
    const start = (page - 1) * limit;
    const end = start + limit;

    return bookings.slice(start, end);
  }

  async getBookingById(id: string) {
    return await this.bookingRepository.getBookingById(id);
  }

  async getBookingsByCustomerId(id: string) {
    return await this.bookingRepository.getBookingsByCustomerId(id)
  }

  async getBookingsByHotelAdminId(id: string) {
    return await this.bookingRepository.getBookingsByHotelAdminId(id)
  }

  async createBooking(bookingData: CreateBookingDto) {
    return await this.bookingRepository.createBooking(bookingData)
  }

  async cancelBooking(id: string) {
    return this.bookingRepository.cancelBooking(id);
  }

  async postponeBooking(bookingData: PostponeBookingDto) {
      return this.bookingRepository.postponeBooking(bookingData)
  }
}
