import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { AvailabilityService } from "./availability.service";
import { CreateAvailabilityDto, UpdateAvailabilityDto } from "./availability.dtos";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/auth/guards/roles.enum";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";

@ApiTags('RoomAvailability')
@Controller('availabilities')
export class AvailabilityController {
    constructor(private readonly availabilityService: AvailabilityService) { }

    @ApiQuery({
        name: 'page',
        required: false,
        description: 'Número de página.',
        example: '1',
    })
    @ApiQuery({
        name: 'limit',
        required: false,
        description: 'Número de registros en una página.',
        example: '10',
    })
    @ApiOperation({ summary: 'Trae todas las availabilities.' })
    @ApiBearerAuth()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @Get()
    @HttpCode(200)
    async getAllAvailabilities(
        @Query('page') page: string,
        @Query('limit') limit: string,
    ) {
        if (!page) page = '1';
        if (!limit) limit = '10';

        return await this.availabilityService.getAllAvailabilities(Number(page), Number(limit))
    }

    @ApiQuery({
        name: 'page',
        required: false,
        description: 'Número de página.',
        example: '1',
    })
    @ApiQuery({
        name: 'limit',
        required: false,
        description: 'Número de registros en una página.',
        example: '10',
    })
    @ApiOperation({ summary: 'Trae todas las availabilities con borrado lógico.' })
    @ApiBearerAuth()
    @Roles(Role.User, Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @Get('isDeleted')
    @HttpCode(200)
    async getIsDeletedAvailabilities(
        @Query('page') page: string,
        @Query('limit') limit: string,
    ) {
        if (!page) page = '1';
        if (!limit) limit = '10';

        return await this.availabilityService.getIsDeletedAvailabilities(Number(page), Number(limit))
    }

    @ApiQuery({
        name: 'page',
        required: false,
        description: 'Número de página.',
        example: '1',
    })
    @ApiQuery({
        name: 'limit',
        required: false,
        description: 'Número de registros en una página.',
        example: '10',
    })
    @ApiBearerAuth()
    @Roles(Role.User, Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @ApiOperation({ summary: 'Trae todas las availabilities de un room type por su id.' })
    @Get('/roomtype/:id')
    @HttpCode(200)
    async getAvailabilitiesByRoomTypeId(@Param('id', ParseUUIDPipe) roomTypeId: string,
        @Query('page') page: string,
        @Query('limit') limit: string,
    ) {
        if (!page) page = '1';
        if (!limit) limit = '10';
        return await this.availabilityService.getAvailabilitiesByRoomTypeId(roomTypeId, Number(page), Number(limit))
    }

    @ApiOperation({ summary: 'Crea una availability.' })
    @ApiBearerAuth()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @Post()
    @HttpCode(201)
    async createRoomAvailability(@Body() createAvailabilityData: CreateAvailabilityDto) {
        const { roomId, startDate, endDate } = createAvailabilityData
        return await this.availabilityService.createRoomAvailability(roomId, startDate, endDate)
    }

    @ApiOperation({ summary: 'Actualiza una availability por id.' })
    @ApiBearerAuth()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @Put(':id')
    @HttpCode(200)
    async updateAvailability(@Param('id', ParseUUIDPipe) id: string, @Body() updateAvailabilityData: UpdateAvailabilityDto) {
        return await this.availabilityService.updateAvailability(id, updateAvailabilityData)
    }

    @ApiOperation({ summary: 'Hace el borrado lógico de una availability por id.' })
    @ApiBearerAuth()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @Delete('softDelete/:id')
    @HttpCode(200)
    async softDeleteRoomAvailability(@Param('id', ParseUUIDPipe) id: string) {
        return await this.availabilityService.softDeleteRoomAvailability(id)
    }

    @ApiOperation({ summary: 'Elimina una availability por id.' })
    @ApiBearerAuth()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @Delete(':id')
    @HttpCode(200)
    async deleteRoomAvailability(@Param('id', ParseUUIDPipe) id: string) {
        return await this.availabilityService.deleteRoomAvailability(id)
    }
}