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
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Booking')
@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) { }

  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Número de página.',
    example: '1',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Número de registros en una página.',
    example: '10',
  })
  @ApiOperation({ summary: 'Trae todos los bookings.' })
  @ApiBearerAuth()
  @Roles(Role.Admin, Role.SuperAdmin)
  @UseGuards(AuthGuard, RolesGuard)
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

  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Número de página.',
    example: '1',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Número de registros en una página.',
    example: '10',
  })
  @ApiOperation({ summary: 'Trae todos los bookings con borrado lógico.' })
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
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

  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Número de página.',
    example: '1',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Número de registros en una página.',
    example: '10',
  })
  @ApiOperation({ summary: 'Trae todos los bookings de un customer.' })
  @ApiBearerAuth()
  @Roles(Role.User, Role.SuperAdmin)
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

  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Número de página.',
    example: '1',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Número de registros en una página.',
    example: '10',
  })
  @ApiOperation({ summary: 'Trae todos los bookings de un hotel admin.' })
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

  @ApiOperation({ summary: 'Trae un booking por id.' })
  @ApiBearerAuth()
  @Roles(Role.Admin, Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  @HttpCode(200)
  async getBookingById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.bookingService.getBookingById(id);
  }

  @ApiOperation({ summary: 'Crea un booking.' })
  @ApiBearerAuth()
  @Roles(Role.User, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  @HttpCode(201)
  async createBooking(@Body() bookingData: CreateBookingDto) {
    return await this.bookingService.createBooking(bookingData);
  }

  @ApiOperation({ summary: 'Cancela un booking, cambia su status a Cancelado.' })
  @ApiBearerAuth()
  @Roles(Role.User, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Put('cancel/:id')
  @HttpCode(201)
  async cancelBooking(@Param('id', ParseUUIDPipe) id: string) {
    return await this.bookingService.cancelBooking(id);
  }

  @ApiOperation({ summary: 'Pospone una o más fechas reservadas en un booking.' })
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

  @ApiOperation({ summary: 'Hace el borrado lógico de un booking por id.' })
  @ApiBearerAuth()
  @Roles(Role.Admin, Role.User, Role.SuperAdmin)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete('softDelete/:id')
  @HttpCode(200)
  async softDeleteBooking(@Param('id', ParseUUIDPipe) id: string) {
    return await this.bookingService.softDeleteBooking(id)
  }

  @ApiOperation({ summary: 'Elimina un booking por id.' })
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  @HttpCode(200)
  async deleteBooking(@Param('id', ParseUUIDPipe) id: string) {
    return await this.bookingService.deleteBooking(id)
  }

}
