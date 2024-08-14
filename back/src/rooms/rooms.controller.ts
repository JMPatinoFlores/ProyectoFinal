import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './rooms.dtos';
import { LoadRoomsDto } from './rooms.loadDtos';
import { UpdateRoomDto } from './rooms.updateDto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Role } from 'src/auth/guards/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Room } from './rooms.entity';

@ApiTags('Rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsDbService: RoomsService) {}

  @ApiOperation({summary: 'List all Rooms'})
  @ApiResponse({ status: 206, description: 'List of Rooms as requested :)'})
  @ApiResponse({ status: 404, description: 'There are not rooms :('})
  @Get()
  getDbRooms() {
    return this.roomsDbService.getDbRooms();
  }

  @ApiOperation({summary: 'Create a new room'})
  @ApiBody({type: CreateRoomDto,
      examples: {
          example:{
              summary:"Example of registering a new room",
              value:{
                  "roomNumber": '201'
              }
          }
      }
  })
  @ApiResponse({ status: 200, description: 'Room created successfully :)'})
  @ApiResponse({ status: 400, description: 'The format used is incorrect :('})
  @ApiResponse({ status: 404, description: 'Room not created :('})
  @ApiBearerAuth()
  @Post()
  @Roles(Role.Admin,Role.SuperAdmin)
  @UseGuards(AuthGuard, RolesGuard)
  createDbRoom(@Body() roomDto: CreateRoomDto) {
    return this.roomsDbService.createDbRoom(roomDto);
  }

  @ApiOperation({summary: 'Create N new rooms'})
  @ApiBody({type: CreateRoomDto,
      examples: {
          example:{
              summary:"Example of registering some rooms",
              value:{
                    "nIni": 30,
                    "nEnd": 40,
                    "quantity": 3,
                    "roomsTypeId": "025bdfaf-237b-4a26-9768-296e64960c85"
              }
          }
      }
  })
  @ApiResponse({ status: 200, description: 'Rooms created successfully :)'})
  @ApiResponse({ status: 400, description: 'The format used is incorrect :('})
  @ApiResponse({ status: 404, description: 'Rooms were not created :('})
  @ApiBearerAuth()
  @Post('load')
  @Roles(Role.Admin,Role.SuperAdmin)
  @UseGuards(AuthGuard, RolesGuard)
  loadRooms(@Body() loadroomDto: LoadRoomsDto) {
    return this.roomsDbService.loadRooms(loadroomDto);
  }

  @ApiOperation({summary: 'List all rooms deleted'})
  @ApiResponse({ status: 200, description: 'List of rooms deleted :)'})
  @ApiResponse({ status: 404, description: 'There are not rooms deleted :('})
  @ApiBearerAuth()
  @Get('deleted')
  @Roles(Role.Admin,Role.SuperAdmin)
  @UseGuards(AuthGuard, RolesGuard)
  getDbRoomDeleted() {
    return this.roomsDbService.getDbRoomDeleted();
  }

  @ApiOperation({summary: 'List of all rooms of that room type'})
  @ApiResponse({ status: 200, description: 'List of rooms :)'})
  @ApiResponse({ status: 404, description: 'There are no rooms for that room type :('})
  @ApiBearerAuth()
  @Get('roomtype/:id')
  @Roles(Role.Admin, Role.SuperAdmin)
  @UseGuards(AuthGuard, RolesGuard)
  async getRoomsByRoomTypeId(@Param('id', ParseUUIDPipe) id: string) {
    return await this.roomsDbService.getRoomsByRoomTypeId(id);
  }

  @ApiOperation({ summary: 'Lista todos los room de un room type con base en una search query y el id del room type.' })
  @ApiQuery({ name: 'search', required: true, description: 'buscar...', example: '102' })
  @ApiResponse({ status: 206, description: 'List of room matches :)' })
  @ApiResponse({ status: 404, description: 'There are no rooms :(' })
  @Get('search')
  async searchRooms(@Query('roomTypeId') hotelId: string, @Query('search') query?: string): Promise<Room[]> {
    console.log('Received search term:', query);
    return await this.roomsDbService.searchRooms(hotelId, query);
  }

  @ApiOperation({summary: 'List only one room by ID'})
  @ApiParam({ name: 'id', required: true, description: 'ID Room', example: '1121qwewasd-qw54wqeqwe-45121' })
  @ApiResponse({ status: 200, description: 'Room found successfuly :)'})
  @ApiResponse({ status: 404, description: 'Room not found :('})
  @Get(':id')
  getDbRoomById(@Param('id', ParseUUIDPipe) id: string) {
    return this.roomsDbService.getDbRoomById(id);
  }

  @ApiOperation({summary: 'Restore a Room'})
  @ApiParam({ name: 'id', required: true, description: 'ID Room', example: '1121qwewasd-qw54wqeqwe-45121' })
  @ApiResponse({ status: 200, description: 'Room updated successfully :)'})
  @ApiResponse({ status: 400, description: 'The format used is incorrect :('})
  @ApiResponse({ status: 404, description: 'Room not was updated :('})
  @ApiBearerAuth()
  @Put('restore/:id')
  @Roles(Role.Admin,Role.SuperAdmin)
  @UseGuards(AuthGuard, RolesGuard)
  restoreDbRoom(@Param('id', ParseUUIDPipe) id: string) {
    return this.roomsDbService.restoreDbRoom(id);
  }

  @ApiOperation({summary: 'Edit data of Roomt'})
  @ApiParam({ name: 'id', required: true, description: 'ID Room', example: '1121qwewasd-qw54wqeqwe-45121' })
    @ApiBody({type: UpdateRoomDto,
        examples: {
            example:{
                summary:"Example of editing a room",
                value:{
                    "roomNumber": '205'
                }
            }
        }
    })
  @ApiResponse({ status: 200, description: 'Room updated successfully :)'})
  @ApiResponse({ status: 400, description: 'The format used is incorrect :('})
  @ApiResponse({ status: 404, description: 'Room not was updated :('})
  @ApiBearerAuth()
  @Put(':id')
  @Roles(Role.Admin,Role.SuperAdmin)
  @UseGuards(AuthGuard, RolesGuard)
  updateDbRoom(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateroomDto: Partial<UpdateRoomDto>,
  ) {
    return this.roomsDbService.updateDbRoom(id, updateroomDto);
  }

  @ApiOperation({summary: 'Delete a room'})
  @ApiParam({ name: 'id', required: true, description: 'ID Room', example: '1121qwewasd-qw54wqeqwe-45121' })
  @ApiResponse({ status: 200, description: 'Room deleted successfully :)'})
  @ApiResponse({ status: 404, description: 'Room not was eliminated  :('})
  @ApiBearerAuth()
  @Delete(':id')
  @Roles(Role.Admin,Role.SuperAdmin)
  @UseGuards(AuthGuard, RolesGuard)
  deleteDbRoom(@Param('id', ParseUUIDPipe) id: string) {
    return this.roomsDbService.deleteDbRoom(id);
  }
}
