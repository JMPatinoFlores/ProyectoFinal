import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { RoomsService } from "./rooms.service";
import { CreateRoomDto } from "./rooms.dtos";
import { LoadRoomsDto } from "./rooms.loadDtos";
import { UpdateRoomDto } from "./rooms.updateDto";


@Controller('rooms')
export class RoomsController{
    constructor(
        private readonly roomsDbService: RoomsService
    ){}

    @Get()
    getDbRooms(){
        return this.roomsDbService.getDbRooms();
    }
    
    @Post()
    createDbRoom(@Body() roomDto: CreateRoomDto){
        return this.roomsDbService.createDbRoom(roomDto);
    }
    
    @Post('load')
    loadRooms(@Body() loadroomDto: LoadRoomsDto){
        return this.roomsDbService.loadRooms(loadroomDto);
    }
    
    @Get('deleted')
    getDbRoomDeleted(){
        return this.roomsDbService.getDbRoomDeleted();
    }

    @Get(':id')
    getDbRoomById(@Param('id', ParseUUIDPipe) id:string){
        return this.roomsDbService.getDbRoomById(id);
    }

    @Put('restore/:id')
    restoreDbRoom(@Param('id', ParseUUIDPipe) id:string){
        return this.roomsDbService.restoreDbRoom(id);
    }

    @Put(':id')
    updateDbRoom(@Param('id', ParseUUIDPipe) id:string, @Body() updateroomDto: Partial<UpdateRoomDto>){
        return this.roomsDbService.updateDbRoom(id, updateroomDto);
    }

    @Delete(':id')
    deleteDbRoom(@Param('id', ParseUUIDPipe) id:string){
        return this.roomsDbService.deleteDbRoom(id);
    }

}