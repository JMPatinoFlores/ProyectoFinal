import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { CreateHotelDto } from './hotels.dtos';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelDbService: HotelsService) {}

  @Get()
  getDbHotels() {
    return this.hotelDbService.getDbHotels();
  }

  @Post()
  createDbHotel(@Body() hotelDto: CreateHotelDto) {
    return this.hotelDbService.createDbHotel(hotelDto);
  }

  @Get('search')
  async searchHotels(@Query('name') name: string) {
    const hotels = await this.hotelDbService.searchHotels(name);
    return hotels;
  }

  @Get(':id')
  getDbHotelById(@Param('id', ParseUUIDPipe) id: string) {
    return this.hotelDbService.getDbHotelById(id);
  }
}
