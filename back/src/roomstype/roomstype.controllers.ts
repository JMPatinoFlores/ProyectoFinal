import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { RoomsTypeService } from "./roomstype.services";
import { CreateRoomTypeDto } from "./roomstype.dtos";

@Controller('roomstype')
export class RoomsTypeController {
    constructor(
        private readonly roomstypeDbService: RoomsTypeService
    ){}

    @Get()
    getDbRoomsType(){
        return this.roomstypeDbService.getDbRoomsType();
    }

    @Get(':id')
    getDbRoomTypeById(@Param('id', ParseUUIDPipe) id:string){
        return this.roomstypeDbService.getDbRoomTypeById(id);
    }

    @Post()
    createDbRoomtype(@Body() roomtypeDto: CreateRoomTypeDto){
        return this.roomstypeDbService.createDbRoomtype(roomtypeDto);
    }

}