import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { HotelsService } from "./hotels.services";
import { CreateHotelDto } from "./hotels.dtos";

@Controller('hotels')
export class HotelsController{
    constructor(
        private readonly hotelDbService: HotelsService
    ){}

    @Get()
    getDbHotels(){
        return this.hotelDbService.getDbHotels();
    }

    @Get(':id')
    getDbHotelById(@Param('id', ParseUUIDPipe) id:string){
        return this.hotelDbService.getDbHotelById(id);
    }

    @Post()
    createDbHotel(@Body() hotelDto: CreateHotelDto){
        return this.hotelDbService.createDbHotel(hotelDto);
    }

}