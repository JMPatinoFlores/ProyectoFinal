import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
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
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Roomstype')
@Controller('roomstype')
export class RoomsTypeController {
  constructor(private readonly roomstypeDbService: RoomsTypeService) {}

  @ApiOperation({summary: 'List all typerooms'})
  @ApiResponse({ status: 200, description: 'List of typerooms :)'})
  @ApiResponse({ status: 404, description: 'There are not typerooms :('})
  @Get()
  getDbRoomsType() {
    return this.roomstypeDbService.getDbRoomsType();
  }

  @ApiOperation({ summary: 'Lista de room types de un hotel.' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', required: true, description: 'Hotel ID', example: '1121qwewasd-qw54wqeqwe-45121' })
  @Roles(Role.Admin, Role.SuperAdmin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(200)
  @Get('/hotel/:id')
  async getRoomTypesByHotelId(@Param('id', ParseUUIDPipe) hotelId: string) {
    return await this.roomstypeDbService.getRoomTypesByHotelId(hotelId)
  }

  @ApiOperation({summary: 'Create a new Roomtype'})
    @ApiBody({type: CreateRoomTypeDto,
        examples: {
            example:{
                summary:"Example of registering a new roomtype",
                value:{
                    "name": 'familiar',
                    "capacity": 10,
                    "totalBathrooms": 3,
                    "totalBeds": 5,
                    "price": 150,
                    "hotelId": "4b71e7e7-1dda-468f-a432-d2200e2e6d6d"  
                }
            }
        }
    })
  @ApiResponse({ status: 200, description: 'Roomtype created successfully :)'})
  @ApiResponse({ status: 400, description: 'The format used is incorrect :('})
  @ApiResponse({ status: 404, description: 'Roomtype not created :('})
  @ApiBearerAuth()
  @Post()
  @Roles(Role.Admin,Role.SuperAdmin)
  @UseGuards(AuthGuard, RolesGuard)
  createDbRoomtype(@Body() roomtypeDto: CreateRoomTypeDto) {
    return this.roomstypeDbService.createDbRoomtype(roomtypeDto);
  }

  @ApiOperation({summary: 'List all typerooms deleted'})
  @ApiResponse({ status: 200, description: 'List of typerooms deleted :)'})
  @ApiResponse({ status: 404, description: 'There are not typerooms deleted :('})
  @ApiBearerAuth()
  @Get('deleted')
  @Roles(Role.Admin,Role.SuperAdmin)
  @UseGuards(AuthGuard, RolesGuard)
  getDbRoomstypeDeleted() {
    return this.roomstypeDbService.getDbRoomstypeDeleted();
  }

  @ApiOperation({summary: 'List only one roomtype by ID'})
  @ApiParam({ name: 'id', required: true, description: 'ID Roomtype', example: '1121qwewasd-qw54wqeqwe-45121' })
  @ApiResponse({ status: 200, description: 'Roomtype found successfuly :)'})
  @ApiResponse({ status: 404, description: 'Roomtype not found :('})
  @Get(':id')
  getDbRoomTypeById(@Param('id', ParseUUIDPipe) id: string) {
    return this.roomstypeDbService.getDbRoomTypeById(id);
  }

  @ApiOperation({summary: 'Restore a Roomtype'})
  @ApiParam({ name: 'id', required: true, description: 'ID Roomtype', example: '1121qwewasd-qw54wqeqwe-45121' })
  @ApiResponse({ status: 200, description: 'Roomtype updated successfully :)'})
  @ApiResponse({ status: 400, description: 'The format used is incorrect :('})
  @ApiResponse({ status: 404, description: 'Roomtype not was updated :('})
  @ApiBearerAuth()
  @Put('restore/:id')
  @Roles(Role.Admin,Role.SuperAdmin)
  @UseGuards(AuthGuard, RolesGuard)
  restoreRoomstype(@Param('id', ParseUUIDPipe) id: string) {
    return this.roomstypeDbService.restoreRoomstype(id);
  }


  @ApiOperation({summary: 'Edit data of Roomtype'})
  @ApiParam({ name: 'id', required: true, description: 'ID Roomtype', example: '1121qwewasd-qw54wqeqwe-45121' })
    @ApiBody({type: UpdateRoomsTypeDto,
        examples: {
            example:{
                summary:"Example of editing a roomtype",
                value:{
                    "name": 'matrimonial',
                    "capacity": 2,
                    "totalBathrooms": 1,
                    "totalBeds": 1,
                    "price": 250,
                    "hotelId": "4b71e7e7-1dda-468f-a432-d2200e2e6d6d"  
                }
            }
        }
    })
  @ApiResponse({ status: 200, description: 'Roomtype updated successfully :)'})
  @ApiResponse({ status: 400, description: 'The format used is incorrect :('})
  @ApiResponse({ status: 404, description: 'Roomtype not was updated :('})
  @ApiBearerAuth()
  @Put(':id')
  @Roles(Role.Admin,Role.SuperAdmin)
  @UseGuards(AuthGuard, RolesGuard)
  updateDbRoomstype(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRoomstypeDto: Partial<UpdateRoomsTypeDto>,
  ) {
    return this.roomstypeDbService.updateDbRoomstype(id, updateRoomstypeDto);
  }

  @ApiOperation({summary: 'Delete a roomtype'})
  @ApiParam({ name: 'id', required: true, description: 'ID Roomtype', example: '1121qwewasd-qw54wqeqwe-45121' })
  @ApiResponse({ status: 200, description: 'Roomtype deleted successfully :)'})
  @ApiResponse({ status: 404, description: 'Roomtype not was eliminated  :('})
  @ApiBearerAuth()
  @Delete(':id')
  @Roles(Role.Admin,Role.SuperAdmin)
  @UseGuards(AuthGuard, RolesGuard)
  deleteDbRoomtype(@Param('id', ParseUUIDPipe) id: string) {
    return this.roomstypeDbService.deleteDbRoomtype(id);
  }
}
