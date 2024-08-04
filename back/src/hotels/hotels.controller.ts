import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { CreateHotelDto } from "./hotels.dtos";
import { Hotel } from "./hotels.entity";
import { UpdateHotelDto } from "./hotels.updateDto";
import { HotelsService } from "./hotels.service";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/auth/guards/roles.enum";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelDbService: HotelsService) {}

  @Get()
  getDbHotels(@Query('page') page:string, @Query('limit') limit:string) {
    !page ? page = '1' : page;
    !limit ? limit = '8' : limit;
    return this.hotelDbService.getDbHotels(Number(page), Number(limit));
  }

  @Post()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
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
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getDbHotelsDeleted(){
    return this.hotelDbService.getDbHotelsDeleted();
  }

  @Get(':id')
  getDbHotelById(@Param('id', ParseUUIDPipe) id: string) {
    return this.hotelDbService.getDbHotelById(id);
  }

  @Put('restore/:id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  restoreHotel(@Param('id', ParseUUIDPipe) id:string){
    return this.hotelDbService.restoreHotel(id);
  }

  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  updateDbHotel(@Param('id', ParseUUIDPipe) id:string, @Body() updateHotelDto: Partial<UpdateHotelDto>){
    return this.hotelDbService.updateDbHotel(id, updateHotelDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  deleteDbHotel(@Param('id', ParseUUIDPipe) id: string){
    return this.hotelDbService.deleteDbHotel(id);
  }

}
