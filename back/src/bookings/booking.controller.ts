import { Body, Controller, Get, HttpCode, Param, ParseUUIDPipe, Post, Put, Query } from "@nestjs/common";
import { BookingService } from "./booking.service";
import { CreateBookingDto } from "./dtos/create-booking.dto";

@Controller('bookings')
export class BookingController {
    constructor(private readonly bookingService: BookingService) { }
    
    @HttpCode(200)
    @Get()
    async getBookings(@Query('page') page: string, @Query('limit') limit: string) {
        if (!page) page = "1"
        if (!limit) limit = "10"

        return await this.bookingService.getBookings(Number(page), Number(limit))
    }
    
    @Get(':id')
    @HttpCode(200)
    async getBookingById(@Param('id', ParseUUIDPipe) id: string) {
        return await this.bookingService.getBookingById(id)
    }

    @Post()
    @HttpCode(201)
    async createBooking(@Body() bookingData: CreateBookingDto) {
        return await this.bookingService.createBooking(bookingData)
    }

    @Put('cancel/:id')
    @HttpCode(201)
    async cancelBooking(@Param('id', ParseUUIDPipe) id: string) {
        return this.bookingService.cancelBooking(id)
    }

    @Put('postpone/:id')
    @HttpCode(201)
    async postponeBooking(@Param('id', ParseUUIDPipe) id: string, @Query('checkInDate') checkInDate: string) {
        return this.bookingService.postponeBooking(id, checkInDate)
    }
}