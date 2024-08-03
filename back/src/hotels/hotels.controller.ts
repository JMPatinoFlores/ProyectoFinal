import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query } from "@nestjs/common";
import { CreateHotelDto } from "./hotels.dtos";
import { Hotel } from "./hotels.entity";
import { UpdateHotelDto } from "./hotels.updateDto";
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
  async searchHotels( @Query('search') query?: string): Promise<Hotel[]> {
    console.log('Received search term:', query);  
    return await this.hotelDbService.searchHotels(query);
  }

  @Get('deleted')
  getDbHotelsDeleted(){
    return this.hotelDbService.getDbHotelsDeleted();
  }

  @Get(':id')
  getDbHotelById(@Param('id', ParseUUIDPipe) id: string) {
    return this.hotelDbService.getDbHotelById(id);
  }

  @Put('restore/:id')
  restoreHotel(@Param('id', ParseUUIDPipe) id:string){
    return this.hotelDbService.restoreHotel(id);
  }

  @Put(':id')
  updateDbHotel(@Param('id', ParseUUIDPipe) id:string, @Body() updateHotelDto: Partial<UpdateHotelDto>){
    return this.hotelDbService.updateDbHotel(id, updateHotelDto);
  }

  @Delete(':id')
  deleteDbHotel(@Param('id', ParseUUIDPipe) id: string){
    return this.hotelDbService.deleteDbHotel(id);
  }

}
