import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query } from "@nestjs/common";
import { CreateHotelDto } from "./hotels.dtos";
import { Hotel } from "./hotels.entity";
import { HotelsService } from "./hotels.service";

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelDbService: HotelsService) {}

  @Get()
  getDbHotels() {
    return this.hotelDbService.getDbHotels();
  }

    @Post()
    createDbHotel(@Body() hotelDto: CreateHotelDto){
        return this.hotelDbService.createDbHotel(hotelDto);
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
    
    @Get('search')
    async searchHotels(
        @Query('search') query?: string
      ): Promise<Hotel[]> {
        console.log('Received search term:', query);  // Agrega este log para verificar el valor
        return await this.hotelDbService.searchHotels(query);
      }

  @Get(':id')
  getDbHotelById(@Param('id', ParseUUIDPipe) id: string) {
    return this.hotelDbService.getDbHotelById(id);
  }
}
