import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Room } from "./rooms.entity";
import { RoomsController } from "./rooms.controller";
import { RoomsRepository } from "./rooms.repository";
import { RoomsService } from "./rooms.service";
import { RoomsType } from "src/roomstype/roomstype.entity";
import { Hotel } from "src/hotels/hotels.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Room, RoomsType,Hotel])],
    controllers: [RoomsController],
    providers: [RoomsRepository, RoomsService]
})
export class RoomsModule{

}