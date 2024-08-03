import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { RoomsTypeService } from "./roomstype.service";
import { CreateRoomTypeDto } from "./roomstype.dtos";
import { UpdateRoomsTypeDto } from "./romstype.udpateDto";

@Controller('roomstype')
export class RoomsTypeController {
    constructor(
        private readonly roomstypeDbService: RoomsTypeService
    ){}

    @Get()
    getDbRoomsType(){
        return this.roomstypeDbService.getDbRoomsType();
    }

    @Post()
    createDbRoomtype(@Body() roomtypeDto: CreateRoomTypeDto){
        return this.roomstypeDbService.createDbRoomtype(roomtypeDto);
    }

    @Get('deleted')
    getDbRoomstypeDeleted(){
      return this.roomstypeDbService.getDbRoomstypeDeleted();
    }

    @Get(':id')
    getDbRoomTypeById(@Param('id', ParseUUIDPipe) id:string){
        return this.roomstypeDbService.getDbRoomTypeById(id);
    }

    @Put('restore/:id')
    restoreRoomstype(@Param('id', ParseUUIDPipe) id:string){
      return this.roomstypeDbService.restoreRoomstype(id);
    }

    @Put(':id')
    updateDbRoomstype(@Param('id', ParseUUIDPipe) id:string, @Body() updateRoomstypeDto: Partial<UpdateRoomsTypeDto>){
      return this.roomstypeDbService.updateDbRoomstype(id, updateRoomstypeDto);
    }

    @Delete(':id')
    deleteDbRoomtype(@Param('id', ParseUUIDPipe) id: string){
        return this.roomstypeDbService.deleteDbRoomtype(id);
    }

}