import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Hotel } from "src/hotels/hotels.entity";
import { Repository } from "typeorm";
import { RoomAvailability } from "./availability.entity";
import { Room } from "src/rooms/rooms.entity";
import { RoomsType } from "src/roomstype/roomstype.entity";

@Injectable()
export class AvailabilityRepository {
    constructor(@InjectRepository(RoomAvailability) private readonly roomAvailabilityDBRepository: Repository<RoomAvailability>,
        @InjectRepository(Room) private readonly roomDBRepository: Repository<Room>,
        @InjectRepository(RoomsType) private readonly roomTypeDBRepository: Repository<RoomsType>
    ) { }

    async getAllAvailabilities() {
        const availabilities = await this.roomAvailabilityDBRepository.find()
        if (availabilities.length === 0) throw new NotFoundException('No se encontraron availabilities.')
        return availabilities
    }

    async getAvailabilitiesByRoomTypeId(roomTypeId: string) {
        const roomType = await this.roomTypeDBRepository.findOne({ where: { id: roomTypeId }, relations: { rooms: { availabilities: true } } })
        
        if (!roomType) throw new BadRequestException('No existe un roomtype con ese id.')
        let nonAvailabilityPeriods = []

        for (const room of roomType.rooms) {
            for (const availability of room.availabilities) {
                nonAvailabilityPeriods.push(availability)
            }
        }

        if (nonAvailabilityPeriods.length === 0) throw new NotFoundException('El roomtype no contiene availabilities.') 
        return nonAvailabilityPeriods
    }

    async createRoomAvailability(roomId: string, startDate: string, endDate: string) {
        const room: Room = await this.roomDBRepository.findOneBy({ id: roomId })
        if (!room) {
            throw new BadRequestException('No existe un room con ese id.')
        }
        return await this.roomAvailabilityDBRepository.save({room: room, startDate: startDate, endDate: endDate})
    }

    async deleteRoomAvailability(id: string) {
        await this.roomAvailabilityDBRepository.delete({ id: id })
        return "Availability eliminada."
    }
}