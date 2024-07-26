import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { RoomsService } from "./rooms.services";
import { CreateRoomDto } from "./rooms.dtos";
import { LoadRoomsDto } from "./rooms.loadDtos";


@Controller('rooms')
export class RoomsController{
    constructor(
        private readonly roomsDbService: RoomsService
    ){}

    @Get()
    getDbRooms(){
        return this.roomsDbService.getDbRooms();
    }

    @Get(':id')
    getDbRoomById(@Param('id', ParseUUIDPipe) id:string){
        return this.roomsDbService.getDbRoomById(id);
    }

    @Post()
    createDbRoom(@Body() roomDto: CreateRoomDto){
        return this.roomsDbService.createDbRoom(roomDto);
    }

    @Post('load')
    loadRooms(@Body() loadroomDto: LoadRoomsDto){
        return this.roomsDbService.loadRooms(loadroomDto);
    }

}