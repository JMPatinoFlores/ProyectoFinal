import { Injectable } from "@nestjs/common";
import { AvailabilityRepository } from "./availability.repository";

@Injectable()
export class AvailabilityService {
    constructor(private readonly availabilityRepository: AvailabilityRepository) {}

    async getAvailabilitiesByRoomTypeId(roomTypeId: string) {
        await this.availabilityRepository.getAvailabilitiesByRoomTypeId(roomTypeId)
    }

    async createRoomAvailability(roomId: string, startDate: string, endDate: string) {
        return await this.availabilityRepository.createRoomAvailability(roomId, startDate, endDate)
    }
}