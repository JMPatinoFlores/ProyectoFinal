import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RoomsTypeService } from './roomstype.service';
import { CreateRoomTypeDto } from './roomstype.dtos';
import { UpdateRoomsTypeDto } from './romstype.udpateDto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/guards/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('roomstype')
export class RoomsTypeController {
  constructor(private readonly roomstypeDbService: RoomsTypeService) {}

  @Get()
  getDbRoomsType() {
    return this.roomstypeDbService.getDbRoomsType();
  }

  @Post()
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  createDbRoomtype(@Body() roomtypeDto: CreateRoomTypeDto) {
    return this.roomstypeDbService.createDbRoomtype(roomtypeDto);
  }

  @Get('deleted')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getDbRoomstypeDeleted() {
    return this.roomstypeDbService.getDbRoomstypeDeleted();
  }

  @Get(':id')
  getDbRoomTypeById(@Param('id', ParseUUIDPipe) id: string) {
    return this.roomstypeDbService.getDbRoomTypeById(id);
  }

  @Put('restore/:id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  restoreRoomstype(@Param('id', ParseUUIDPipe) id: string) {
    return this.roomstypeDbService.restoreRoomstype(id);
  }

  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  updateDbRoomstype(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRoomstypeDto: Partial<UpdateRoomsTypeDto>,
  ) {
    return this.roomstypeDbService.updateDbRoomstype(id, updateRoomstypeDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  deleteDbRoomtype(@Param('id', ParseUUIDPipe) id: string) {
    return this.roomstypeDbService.deleteDbRoomtype(id);
  }
}
