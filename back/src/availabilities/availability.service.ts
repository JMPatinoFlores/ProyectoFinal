import { Injectable } from "@nestjs/common";
import { AvailabilityRepository } from "./availability.repository";

@Injectable()
export class AvailabilityService {
    constructor(private readonly availabilityRepository: AvailabilityRepository) { }
    
    async getAllAvailabilities() {
        return await this.availabilityRepository.getAllAvailabilities()
    }

    async getAvailabilitiesByRoomTypeId(roomTypeId: string) {
        return await this.availabilityRepository.getAvailabilitiesByRoomTypeId(roomTypeId)
    }

    async createRoomAvailability(roomId: string, startDate: string, endDate: string) {
        return await this.availabilityRepository.createRoomAvailability(roomId, startDate, endDate)
    }

    async deleteRoomAvailability(id: string) {
        return await this.deleteRoomAvailability(id)
    }
}