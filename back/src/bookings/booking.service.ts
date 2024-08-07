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

  async getIsDeletedBookings(page: number, limit: number) {
    const bookings = await this.bookingRepository.getIsDeletedBookings();
    const start = (page - 1) * limit;
    const end = start + limit;

    return bookings.slice(start, end);
  }

  async getBookingById(id: string) {
    return await this.bookingRepository.getBookingById(id);
  }

  async getBookingsByCustomerId(id: string, page: number, limit: number) {
    const bookings = await this.bookingRepository.getBookingsByCustomerId(id);
    const start = (page - 1) * limit;
    const end = start + limit;

    return bookings.slice(start, end);
  }

  async getBookingsByHotelAdminId(id: string, page: number, limit: number) {
    const bookings = await this.bookingRepository.getBookingsByHotelAdminId(id);
    const start = (page - 1) * limit;
    const end = start + limit;

    return bookings.slice(start, end);
  }

  async createBooking(bookingData: CreateBookingDto) {
    return await this.bookingRepository.createBooking(bookingData)
  }

  async cancelBooking(id: string) {
    return await this.bookingRepository.cancelBooking(id);
  }

  async postponeBooking(bookingData: PostponeBookingDto) {
    return await this.bookingRepository.postponeBooking(bookingData)
  }

  async deleteBooking(id: string) {
    return await this.bookingRepository.deleteBooking(id)
  }

  async softDeleteBooking(id: string) {
    return await this.bookingRepository.softDeleteBooking(id)
  }
}
