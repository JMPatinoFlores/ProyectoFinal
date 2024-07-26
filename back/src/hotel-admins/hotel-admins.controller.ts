import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { HotelAdminsService } from './hotel-admins.service';
import { UpdateHotelAdminInfoDto } from './hotel-admin.dto';

@Controller('hotel-admins')
export class HotelAdminsController {
  constructor(private readonly hotelAdminService: HotelAdminsService) {}

  //* Todos los admins de Hoteles

  @Get('AllHotelAdmins')
  getAllHotelAdmins(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    !page ? (page = '1') : page;
    !limit ? (limit = '5') : limit;
    if (page && limit)
      return this.hotelAdminService.getAllHotelAdmins(
        Number(page),
        Number(limit),
      );
  }

  //* Obtener un admin de hotel por su ID

  @Get(':id')
  getHotelAdminById(@Param('id') id: string) {
    return this.hotelAdminService.getHotelAdminById(id);
  }

  //* Actualizar/Modificar la información del usuario

  @Put(':id')
  updateHotelAdminInfo(
    @Param('id') id: string,
    @Body() hotelAdmin: UpdateHotelAdminInfoDto,
  ) {
    return this.hotelAdminService.updateHotelAdminInfo(id, hotelAdmin);
  }

  //* Borrado lógico de un admin de hotel

  @Delete(':id')
  logicalDeleteHotelAdmin(@Param('id') id: string) {
    return this.hotelAdminService.logicalDeleteHotelAdmin(id);
  }
}
