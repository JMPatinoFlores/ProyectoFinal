import {
  BadRequestException,
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
import { CreateHotelDto } from './hotels.dtos';
import { Hotel } from './hotels.entity';
import { UpdateHotelDto } from './hotels.updateDto';
import { HotelsService } from './hotels.service';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/auth/guards/roles.enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Hotels')
@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelDbService: HotelsService) {}

  @ApiOperation({summary: 'List all hotels'})
  @ApiResponse({ status: 200, description: 'List of hotels :)'})
  @ApiResponse({ status: 404, description: 'There are not hotels :('})
  @Get()
  getDbHotels() {
    return this.hotelDbService.getDbHotels();
  }

  @ApiOperation({summary: 'Create a new Hotel'})
    @ApiBody({type: CreateHotelDto,
        examples: {
            example:{
                summary:"Example of registering a new Hotel",
                value:{
                    "name": "Hotel Aurora",
                    "email": "hotelaurora@mail.com",    
                    "country": "España",
                    "city": "Santiago de Compostela",
                    "location":[42.8751694,-8.5474774],
                    "totalRooms":10,
                    "address":"Rua Doutor Teixeiro, 15, 15701",
                    "description": "Disfruta de la magia de Santiago de Compostela en el Hotel Aurora, donde la historia y la modernidad se unen en un ambiente acogedor. Nuestro hotel es el lugar perfecto para explorar la ciudad y descubrir sus secretos.",
                    "services" :["Restaurante", "Bar", "Gimnasio", "Spa", "Wi-Fi gratuito"],
                    "hotel_admin_id":"d15b72e9-5316-4e7f-977c-2c7898a951f0"   
                }
            }
        }
    })
  @ApiResponse({ status: 200, description: 'Hotel created successfully :)'})
  @ApiResponse({ status: 400, description: 'The format used is incorrect :('})
  @ApiResponse({ status: 404, description: 'Hotel not created :('})
  @ApiBearerAuth()
  @Post()
  @Roles(Role.Admin,Role.SuperAdmin)
  @UseGuards(AuthGuard, RolesGuard)
  createDbHotel(@Body() hotelDto: CreateHotelDto) {
    return this.hotelDbService.createDbHotel(hotelDto);
  }

  @ApiOperation({ summary: 'Lista de hoteles del hotel admin cuyo id es enviado.' })
  @ApiBearerAuth()
  @Roles(Role.Admin, Role.SuperAdmin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(200)
  @Get('hotelAdmin/:id')
  async getHotelsByHotelAdminId(@Param('id', ParseUUIDPipe) hotelAdminId: string) {
    return await this.hotelDbService.getHotelsByHotelAdminId(hotelAdminId)
  }
    
  @ApiOperation({summary: 'List all Hotels matches for the requested word'})
  @ApiQuery({ name: 'search', required: true, description: 'buscar...', example: 'Peru' })
  @ApiResponse({ status: 206, description: 'List of Hotels matches :)'})
  @ApiResponse({ status: 404, description: 'There are not hotels :('})
  @Get('search')
  async searchHotels(@Query('search') query?: string): Promise<Hotel[]> {
    console.log('Received search term:', query);
    return await this.hotelDbService.searchHotels(query);
  }

  @ApiOperation({summary: 'List all Hotels deleted'})
  @ApiResponse({ status: 200, description: 'List of hotels deleted :)'})
  @ApiResponse({ status: 404, description: 'There are not hotels deleted :('})
  @ApiBearerAuth()
  @Get('deleted')
  @Roles(Role.Admin,Role.SuperAdmin)
  @UseGuards(AuthGuard, RolesGuard)
  getDbHotelsDeleted() {
    return this.hotelDbService.getDbHotelsDeleted();
  }

  @ApiOperation({summary: 'Seeder for a list of Hotels'})
  @ApiResponse({ status: 200, description: 'List of Hotels load... :)'})
  @ApiResponse({ status: 404, description: 'Fail to hotel seeder :('})
  //@ApiBearerAuth()
  //@Roles(Role.Admin)
  //@UseGuards(AuthGuard, RolesGuard)
  @Get('seeder')
  addHotels() {
    return this.hotelDbService.addHotels();
  }

  @Get('filters')
  async getFilteredHotels(
    @Query('rating') rating: string,
    @Query('country') country: string,
    @Query('city') city: string,
    @Query('minPrice') minPrice: string,
    @Query('maxPrice') maxPrice: string,
  ) {
    if (Number(maxPrice) < 0 || Number(maxPrice) > 500) throw new BadRequestException('El maxPrice enviado por query debe ser un string de un número del 0 al 500.')
    if (Number(rating) < 1 || Number(rating) > 5) throw new BadRequestException('El rating enviado por query debe ser un string de un número del 1 al 5.')
    return await this.hotelDbService.getFilteredHotels(Number(rating), country, city, Number(minPrice), Number(maxPrice))
  }

  @ApiOperation({summary: 'List only one hotel by ID'})
  @ApiParam({ name: 'id', required: true, description: 'ID Hotel', example: '1121qwewasd-qw54wqeqwe-45121' })
  @ApiResponse({ status: 200, description: 'Hotel found successfuly :)'})
  @ApiResponse({ status: 404, description: 'Hotel not found :('})
  @Get(':id')
  getDbHotelById(@Param('id', ParseUUIDPipe) id: string) {
    return this.hotelDbService.getDbHotelById(id);
  }


  @ApiOperation({summary: 'Restore a Hotel'})
  @ApiParam({ name: 'id', required: true, description: 'ID Hotel', example: '1121qwewasd-qw54wqeqwe-45121' })
  @ApiResponse({ status: 200, description: 'Hotel updated successfully :)'})
  @ApiResponse({ status: 400, description: 'The format used is incorrect :('})
  @ApiResponse({ status: 404, description: 'Hotel not was updated :('})
  @ApiBearerAuth()
  @Put('restore/:id')
  @Roles(Role.Admin,Role.SuperAdmin)
  @UseGuards(AuthGuard, RolesGuard)
  restoreHotel(@Param('id', ParseUUIDPipe) id: string) {
    return this.hotelDbService.restoreHotel(id);
  }

  @ApiOperation({summary: 'Edit data of Hotel'})
    @ApiBody({type: CreateHotelDto,
        examples: {
            example:{
                summary:"Example of editing a Hotel",
                value:{
                    "name": "Hotel Sun Paradise",
                    "email": "hotelsunparadise@mail.com",    
                    "country": "México",
                    "city": "Cancún",
                    "location":[21.1378937,-86.7541472],    
                    "totalRooms":20,    
                    "images":[ "https://content.r9cdn.net/rimg/himg/ca/92/12/ice-55339-73817713_3XL-651930.jpg"],
                    "address":"Blvd. Kukulcan 9, Punta Cancun",
                    "description": "Disfruta del sol y la playa en el Hotel Sun Paradise, donde la relajación y la diversión se unen en un ambiente tropical. Nuestro hotel es el lugar perfecto para escapar de la rutina y disfrutar de la belleza de Cancún.",    
                    "services" :["Restaurante", "Bar", "Piscina", "Spa", "Wi-Fi gratuito", "Servicio de habitaciones"],
                    "hoteladminId":"df40fc42-257e-4e2f-8c68-057092e15839"   
                }
            }
        }
    })
  @ApiResponse({ status: 200, description: 'Hotel udpated successfully :)'})
  @ApiResponse({ status: 400, description: 'The format used is incorrect :('})
  @ApiResponse({ status: 404, description: 'Hotel not was updated :('})
  @ApiBearerAuth()
  @Put(':id')
  @Roles(Role.Admin,Role.SuperAdmin)
  @UseGuards(AuthGuard, RolesGuard)
  updateDbHotel(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateHotelDto: Partial<UpdateHotelDto>,
  ) {
    if (!Object.keys(updateHotelDto).length) {
      throw new BadRequestException('The body cannot be empty');
    }
    return this.hotelDbService.updateDbHotel(id, updateHotelDto);
  }

  @ApiOperation({summary: 'Delete a Hotel'})
  @ApiParam({ name: 'id', required: true, description: 'ID Hotel', example: '1121qwewasd-qw54wqeqwe-45121' })
  @ApiResponse({ status: 200, description: 'Hotel deleted successfully :)'})
  @ApiResponse({ status: 404, description: 'Hotel not was eliminated  :('})
  @ApiBearerAuth()
  @Delete(':id')
  @Roles(Role.Admin,Role.SuperAdmin)
  @UseGuards(AuthGuard, RolesGuard)
  deleteDbHotel(@Param('id', ParseUUIDPipe) id: string) {
    return this.hotelDbService.deleteDbHotel(id);
  }
}




  // @Get('search')
  // async searchHotels(
  //     @Query('name') name?: string,
  //     @Query('country') country?: string,
  //     @Query('city') city?: string,
  //     @Query('service') service?: string,
  //     @Query('room') room?: string
  // ) {
  //     const hotels = await this.hotelDbService.searchHotels(name, country, city, service, room);
  //     return hotels;
  // }