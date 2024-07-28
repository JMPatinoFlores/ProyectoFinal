import { Body, Controller, Get, HttpCode, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { AvailabilityService } from "./availability.service";
import { CreateAvailabilityDto } from "./availability.dtos";

@Controller('availabilities')
export class AvailabilityController {
    constructor(private readonly availabilityService: AvailabilityService) {}

    @Get(':id')
    @HttpCode(200)
    async getAvailabilitiesByRoomTypeId(@Param('id', ParseUUIDPipe) roomTypeId: string) {
        return await this.availabilityService.getAvailabilitiesByRoomTypeId(roomTypeId)
    }

    @Post()
    @HttpCode(201)
    async createRoomAvailability(@Body() createAvailabilityData: CreateAvailabilityDto) {
        const {roomId, startDate, endDate} = createAvailabilityData
        return await this.availabilityService.createRoomAvailability(roomId, startDate, endDate)
    }
}