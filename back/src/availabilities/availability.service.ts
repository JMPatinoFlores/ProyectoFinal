import { Injectable } from "@nestjs/common";
import { AvailabilityRepository } from "./availability.repository";
import { UpdateAvailabilityDto } from "./availability.dtos";

@Injectable()
export class AvailabilityService {
    constructor(private readonly availabilityRepository: AvailabilityRepository) { }

    async getAllAvailabilities(page: number, limit: number) {
        const availabilities = await this.availabilityRepository.getAllAvailabilities();
        const start = (page - 1) * limit;
        const end = start + limit;

        return availabilities.slice(start, end);
    }

    async getIsDeletedAvailabilities(page: number, limit: number) {
        const availabilities = await this.availabilityRepository.getIsDeletedAvailabilities();
        const start = (page - 1) * limit;
        const end = start + limit;

        return availabilities.slice(start, end);
    }

    async getAvailabilitiesByRoomTypeId(roomTypeId: string, page: number, limit: number) {
        const availabilities = await this.availabilityRepository.getAvailabilitiesByRoomTypeId(roomTypeId);
        const start = (page - 1) * limit;
        const end = start + limit;

        return availabilities.slice(start, end);
    }

    async createRoomAvailability(roomId: string, startDate: string, endDate: string) {
        return await this.availabilityRepository.createRoomAvailability(roomId, startDate, endDate)
    }

    async updateAvailability(id: string, updateAvailabilityData: UpdateAvailabilityDto) {
        return await this.availabilityRepository.updateRoomAvailability(id, updateAvailabilityData)
    }

    async deleteRoomAvailability(id: string) {
        return await this.availabilityRepository.deleteRoomAvailability(id)
    }
}