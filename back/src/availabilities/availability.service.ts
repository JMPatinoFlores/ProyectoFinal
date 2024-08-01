import { Injectable } from "@nestjs/common";
import { AvailabilityRepository } from "./availability.repository";
import { UpdateAvailabilityDto } from "./availability.dtos";

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

    async updateAvailability(id: string, updateAvailabilityData: UpdateAvailabilityDto) {
        return await this.availabilityRepository.updateRoomAvailability(id, updateAvailabilityData)
    }

    async deleteRoomAvailability(id: string) {
        return await this.deleteRoomAvailability(id)
    }
}