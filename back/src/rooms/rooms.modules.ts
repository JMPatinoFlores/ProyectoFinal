import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Room } from "./rooms.entity";
import { RoomsController } from "./rooms.controllers";
import { RoomsRepository } from "./rooms.repositories";
import { RoomsService } from "./rooms.services";
import { RoomsType } from "src/roomstype/roomstype.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Room, RoomsType])],
    controllers: [RoomsController],
    providers: [RoomsRepository, RoomsService]
})
export class RoomsModule{

}