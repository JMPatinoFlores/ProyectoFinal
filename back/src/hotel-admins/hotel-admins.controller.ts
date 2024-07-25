import { Controller, Get } from '@nestjs/common';
import { HotelAdminsService } from './hotel-admins.service';

@Controller('hotel-admins')
export class HotelAdminsController {
  constructor(private readonly hotelAdminService: HotelAdminsService) {}
  @Get('AllHotels')
  getAllHotels() {
    return this.hotelAdminService.getHotels();
  }
}
