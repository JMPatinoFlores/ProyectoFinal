import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { AvailabilityService } from "./availability.service";
import { CreateAvailabilityDto, UpdateAvailabilityDto } from "./availability.dtos";

@Controller('availabilities')
export class AvailabilityController {
    constructor(private readonly availabilityService: AvailabilityService) { }

    @Get()
    @HttpCode(200)
    async getAllAvailabilities() {
        return await this.availabilityService.getAllAvailabilities()
    }

    @Get('/roomtype/:id')
    @HttpCode(200)
    async getAvailabilitiesByRoomTypeId(@Param('id', ParseUUIDPipe) roomTypeId: string) {
        return await this.availabilityService.getAvailabilitiesByRoomTypeId(roomTypeId)
    }

    @Post()
    @HttpCode(201)
    async createRoomAvailability(@Body() createAvailabilityData: CreateAvailabilityDto) {
        const { roomId, startDate, endDate } = createAvailabilityData
        return await this.availabilityService.createRoomAvailability(roomId, startDate, endDate)
    }

    @Put(':id')
    @HttpCode(200)
    async updateAvailability(@Param('id', ParseUUIDPipe) id: string, @Body() updateAvailabilityData: UpdateAvailabilityDto) {
        return await this.availabilityService.updateAvailability(id, updateAvailabilityData)
    }

    @Delete('/:id')
    @HttpCode(200)
    async deleteRoomAvailability(@Param('id', ParseUUIDPipe) id: string) {
        return await this.availabilityService.deleteRoomAvailability(id)
    }
}