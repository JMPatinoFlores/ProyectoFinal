import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { HotelAdminsService } from './hotel-admins.service';
import { UpdateHotelAdminInfoDto } from './hotel-admin.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/auth/guards/roles.enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('Hoteleros')
@Controller('hotel-admins')
export class HotelAdminsController {
  constructor(private readonly hotelAdminService: HotelAdminsService) {}

  //* Todos los admins de Hoteles

  @Get('AllHotelAdmins')
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Número de página',
    example: '1',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Límite de elementos por página',
    example: '5',
  })
  @ApiOperation({ summary: 'Ver todos los Hoteleros' })
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
  @ApiBearerAuth()
  @Roles(Role.Admin)
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
