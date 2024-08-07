import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { PostponeBookingDto } from './dtos/postpone-booking.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/guards/roles.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Booking')
@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) { }

  @HttpCode(200)
  @Get()
  async getBookings(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    if (!page) page = '1';
    if (!limit) limit = '10';

    return await this.bookingService.getBookings(Number(page), Number(limit));
  }

  @HttpCode(200)
  @Get('isDeleted')
  async getIsDeletedBookings(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    if (!page) page = '1';
    if (!limit) limit = '10';

    return await this.bookingService.getIsDeletedBookings(Number(page), Number(limit));
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  @HttpCode(200)
  async getBookingById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.bookingService.getBookingById(id);
  }

  @ApiBearerAuth()
  @Roles(Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('customer/:id')
  @HttpCode(200)
  async getBookingsByCustomerId(@Param('id', ParseUUIDPipe) id: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    if (!page) page = '1';
    if (!limit) limit = '10';
    return await this.bookingService.getBookingsByCustomerId(id, Number(page), Number(limit))
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('hotelAdminId/:id')
  @HttpCode(200)
  async getBookingsByHotelAdminId(@Param('id', ParseUUIDPipe) id: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    if (!page) page = '1';
    if (!limit) limit = '10';
    return await this.bookingService.getBookingsByHotelAdminId(id, Number(page), Number(limit))
  }

  @ApiBearerAuth()
  @Roles(Role.User, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  @HttpCode(201)
  async createBooking(@Body() bookingData: CreateBookingDto) {
    return await this.bookingService.createBooking(bookingData);
  }

  @ApiBearerAuth()
  @Roles(Role.User, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Put('cancel/:id')
  @HttpCode(201)
  async cancelBooking(@Param('id', ParseUUIDPipe) id: string) {
    return await this.bookingService.cancelBooking(id);
  }

  @ApiBearerAuth()
  @Roles(Role.User, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Put('postpone')
  @HttpCode(201)
  async postponeBooking(
    @Body() bookingData: PostponeBookingDto
  ) {
    return await this.bookingService.postponeBooking(bookingData);
  }
  
  @ApiBearerAuth()
  @Roles(Role.Admin, Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete('softDelete/:id')
  @HttpCode(200)
  async softDeleteBooking(@Param('id', ParseUUIDPipe) id: string) {
    return await this.bookingService.softDeleteBooking(id)
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  @HttpCode(200)
  async deleteBooking(@Param('id', ParseUUIDPipe) id: string) {
    return await this.bookingService.deleteBooking(id)
  }

}
