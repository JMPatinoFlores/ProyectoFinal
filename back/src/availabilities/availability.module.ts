import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoomAvailability } from "./availability.entity";
import { Room } from "src/rooms/rooms.entity";
import { RoomsType } from "src/roomstype/roomstype.entity";
import { AvailabilityController } from "./availability.controller";
import { AvailabilityService } from "./availability.service";
import { AvailabilityRepository } from "./availability.repository";

@Module({
    imports: [TypeOrmModule.forFeature([RoomAvailability, Room, RoomsType])],
    controllers: [AvailabilityController],
    providers: [AvailabilityService, AvailabilityRepository]
})
export class AvailabilityModule {
    
}