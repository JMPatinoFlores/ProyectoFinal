import { Injectable } from "@nestjs/common";
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

    async getAvailabilitiesByRoomTypeId(roomTypeId: string) {
        const roomType = await this.roomTypeDBRepository.findOne({ where: { id: roomTypeId }, relations: { rooms: { availabilities: true } } })
        
        let nonAvailabilityPeriods = []

        for (const room of roomType.rooms) {
            for (const availability of room.availabilities) {
                nonAvailabilityPeriods.push(availability)
            }
        }

        return nonAvailabilityPeriods
    }

    async createRoomAvailability(roomId: string, startDate: string, endDate: string) {
        const room: Room = await this.roomDBRepository.findOneBy({id: roomId})
        return await this.roomAvailabilityDBRepository.save({room: room, startDate: startDate, endDate: endDate})
    }
}