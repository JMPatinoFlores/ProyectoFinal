import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from "@nestjs/common";
import { RoomsService } from "./rooms.service";
import { CreateRoomDto } from "./rooms.dtos";
import { LoadRoomsDto } from "./rooms.loadDtos";
import { UpdateRoomDto } from "./rooms.updateDto";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { Role } from "src/auth/guards/roles.enum";
import { Roles } from "src/decorators/roles.decorator";


@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsDbService: RoomsService) {}

  @Get()
  getDbRooms() {
    return this.roomsDbService.getDbRooms();
  }

  @Post()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
  createDbRoom(@Body() roomDto: CreateRoomDto) {
    return this.roomsDbService.createDbRoom(roomDto);
  }

  @Post('load')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
  loadRooms(@Body() loadroomDto: LoadRoomsDto) {
    return this.roomsDbService.loadRooms(loadroomDto);
  }

  @Get('deleted')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
  getDbRoomDeleted() {
    return this.roomsDbService.getDbRoomDeleted();
  }

  @Get(':id')
  getDbRoomById(@Param('id', ParseUUIDPipe) id: string) {
    return this.roomsDbService.getDbRoomById(id);
  }

  @Put('restore/:id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
  restoreDbRoom(@Param('id', ParseUUIDPipe) id: string) {
    return this.roomsDbService.restoreDbRoom(id);
  }

  @Put(':id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
  updateDbRoom(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateroomDto: Partial<UpdateRoomDto>,
  ) {
    return this.roomsDbService.updateDbRoom(id, updateroomDto);
  }

  @Delete(':id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
  deleteDbRoom(@Param('id', ParseUUIDPipe) id: string) {
    return this.roomsDbService.deleteDbRoom(id);
  }
}
